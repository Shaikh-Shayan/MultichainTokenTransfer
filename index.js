const Web3 = require("web3");
const dotenv = require("dotenv")
const receiverABI = require("./abi.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");


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




 recMatic.events.BridgeBurn()
  .on('data', async(event) => {

    const user = event.returnValues[0]
    const amount = event.returnValues[1]

    mintBsc.methods.mintEco(user,amount).send({ from: process.env.ADMIN_ADDRESS })
    .on('receipt', function(receipt){
        console.log("Transaction Successful")
    })
    .catch(function(error){
        console.log(error)
    })

 })

 recBsc.events.BridgeBurn()
 .on('data', async(event) => {

   const user = event.returnValues[0]
   const amount = event.returnValues[1]

   mintMatic.methods.mintEco(user,amount).send({ from: process.env.ADMIN_ADDRESS })
   .on('receipt', function(receipt){
       console.log("Transaction Successful")
   })
   .catch(function(error){
       console.log(error)
   })

})