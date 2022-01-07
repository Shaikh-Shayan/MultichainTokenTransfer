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
    const header_config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    axios.post(process.env.POST_URL, obj, header_config)
    .then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
}

 recMatic.events.Locked()
  .on('data', async(event) => {

    console.log("Request received")

    let tx_id = event.returnValues[0]
    let chain_id = event.returnValues[1]
    let benificiary = event.returnValues[2]
    let amount = event.returnValues[3]
    console.log(chain_id)
    if (chain_id == 97){
      const tx = await mintBsc.methods.mint(benificiary,amount).send({ from: process.env.ADMIN_ADDRESS })
      if (tx){
        console.log("Transaction succesful")
       }
   
      }
    })

 recBsc.events.Locked()
 .on('data', async(event) => {
  console.log("Request received")

  let tx_id = event.returnValues[0]
  let chain_id = event.returnValues[1]
  let benificiary = event.returnValues[2]
  let amount = event.returnValues[3]
  console.log(chain_id)
  if (chain_id == 80001){
    const tx = await mintMatic.methods.mint(benificiary,amount).send({ from: process.env.ADMIN_ADDRESS })
    if (tx){
      console.log("Transaction succesful")
     }
 
    }
  }
)

