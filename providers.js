const Web3 = require("web3");
const receiverABI = require("./abi.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const config = require("./bridge-config.js")



const listeners = () => {

    const web3Origin = new Web3(new Web3.providers.WebsocketProvider(config.blockchains.source.providerUrl))
    const web3Destin = new Web3(new Web3.providers.WebsocketProvider(config.blockchains.destination.providerUrl))

    const listenerOrigin = new web3Origin.eth.Contract(receiverABI, config.blockchains.source.bridge)
    const listenerDestin = new web3Destin.eth.Contract(receiverABI, config.blockchains.destination.bridge)

    return { listenerOrigin, listenerDestin }

}

const operators = () => {
    const adminProviderBsc = new HDWalletProvider(process.env.ADMIN_PRIV_KEY, config.blockchains.source.httpProvider)
    const adminProviderMatic = new HDWalletProvider(process.env.ADMIN_PRIV_KEY,config.blockchains.destination.httpProvider)

    const adminWeb3Origin = new Web3(adminProviderBsc)
    const adminWeb3Destin = new Web3(adminProviderMatic)

    const listenerOrigin = new web3Origin.eth.Contract(receiverABI, config.blockchains.source.bridge)
    const listenerDestin = new web3Destin.eth.Contract(receiverABI, config.blockchains.destination.bridge)
    return { adminWeb3Origin, adminWeb3Destin }
}


