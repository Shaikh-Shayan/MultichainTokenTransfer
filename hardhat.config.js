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
const apiKeys = {
  polygonscan: "JFZ3TQ9TASVPJX47ZBN2DM4T7DQZF7DQ6G",
  bscscan: "EBHVCTS7WBIJFHBC2M9RU8A575EK522MBH"
}
module.exports = {
  etherscan:{
    apiKey: apiKeys.bscscan
  },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://speedy-nodes-nyc.moralis.io/7e9361d53693a6e439879bb5/bsc/testnet",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: ["2e5514c43560c3b6f6ef8f7aa0b4c550ef8c0e8d04eb69cc3a20a5480499fd6f"]
    },
    mumbai: {
      url: "https://speedy-nodes-nyc.moralis.io/7e9361d53693a6e439879bb5/polygon/mumbai",
      chainId: 80001,
      gasPrice: 20000000000,
      accounts: ["2e5514c43560c3b6f6ef8f7aa0b4c550ef8c0e8d04eb69cc3a20a5480499fd6f"]
    }
  },
  solidity: "0.8.6"
};
