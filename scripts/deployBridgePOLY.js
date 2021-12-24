// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const addresses = require("./addresses.js")

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const EcoBridge = await hre.ethers.getContractFactory("EcoBridge");
  const bridge = await EcoBridge.deploy("0xA643d0bC2EA22C31968740C793af6420AAAbe00b", "0xA643d0bC2EA22C31968740C793af6420AAAbe00b");
  await bridge.deployed()

  console.log("Bridge deployed to:", bridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
