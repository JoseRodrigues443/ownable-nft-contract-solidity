// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Get deployer utils
  const [deployer] = await ethers.getSigners();

  // Show Account that is being used
  console.log("Deploying contracts with the account:", deployer.address);

  // Show Account balance
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const Contract = await ethers.getContractFactory("Greeter");
  const contract = await Contract.deploy("Olá mundo!!!");

  await contract.deployed();

  // Contract address
  console.log("Contract deployed to:", contract.address);

  // Check ballance again
  console.log("Account balance:", (await deployer.getBalance()).toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
