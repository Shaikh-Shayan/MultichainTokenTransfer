const Web3 = require("web3");
const axios = require('axios')
const receiverABI = require("./abi.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv")

dotenv.config()




const web3Bsc = new Web3(new Web3.providers.WebsocketProvider(process.env.BSC_URL))
const web3Matic = new Web3(new Web3.providers.WebsocketProvider(process.env.MATIC_URL))


const recBsc = new web3Bsc.eth.Contract(receiverABI, process.env.BSC_RECEIVER)
const recMatic = new web3Matic.eth.Contract(receiverABI, process.env.MATIC_RECEIVER)



const adminProviderBsc = new HDWalletProvider(process.env.ADMIN_PRIV_KEY, process.env.ADMIN_PROVIDER_BSC)
const adminWeb3Bsc = new Web3(adminProviderBsc)

const adminProviderMatic = new HDWalletProvider(process.env.ADMIN_PRIV_KEY, process.env.ADMIN_PROVIDER_MATIC)
const adminWeb3Matic = new Web3(adminProviderMatic)

const mintBsc = new adminWeb3Bsc.eth.Contract(receiverABI, process.env.BSC_RECEIVER)
const mintMatic = new adminWeb3Matic.eth.Contract(receiverABI, process.env.MATIC_RECEIVER)


const postTransaction = async(obj) => {
    axios.post(process.env.POST_URL, obj)
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
}

 recMatic.events.BridgeBurn()
  .on('data', async(event) => {

    const tx_id = event.returnValues[0]
    const user = event.returnValues[1]
    const amount = event.returnValues[2]

    const tx = await mintBsc.methods.mintEco(user,amount).send({ from: process.env.ADMIN_ADDRESS })
    if(tx){
        const obj = {
            amount: amount,
            txn_id: tx_id,
            source_address: user,
            destination_blockchain_txn: tx
        }

        postTransaction(obj)
    }

  })

 recBsc.events.BridgeBurn()
 .on('data', async(event) => {

   const tx_id = event.returnValues[0];
   const user = event.returnValues[1];
   const amount = event.returnValues[2];


   const tx = await mintMatic.methods.mintEcoOrigin(user,amount).send({ from: process.env.ADMIN_ADDRESS })
   if (tx){
    const obj = {
        amount: amount,
        txn_id: tx_id,
        source_address: user,
        destination_blockchain_txn: tx
    }

    postTransaction(obj)
   }

})