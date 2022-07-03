import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Olá mundo!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Olá mundo!");

    const setGreetingTx = await greeter.setGreeting("Olá mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Olá mundo!");
  });
});
