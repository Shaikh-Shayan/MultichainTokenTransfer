require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  etherscan:{
    apiKey: "EBHVCTS7WBIJFHBC2M9RU8A575EK522MBH"
  },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://speedy-nodes-nyc.moralis.io/7e9361d53693a6e439879bb5/bsc/testnet",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: ["3b4ded03c98f1a5f2e41d0efeb25588b4a6c886f6b28869fe35a4d8d890c4c8d"]
    }
  },
  solidity: "0.8.6"
};
