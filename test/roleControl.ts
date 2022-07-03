import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("RoleControl", () => {
  let deployedContract: any;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;

  const ADMIN_ADDRESS_CONSTANT =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  const ROLE_ADDRESS_CONSTANT =
    "0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96";

  // SETUP
  beforeEach(async function () {
    const Contract = await ethers.getContractFactory("RoleControl");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    deployedContract = await Contract.deploy(owner.address);
    await deployedContract.deployed();
  });

  it("Owner should be admin", async () => {
    expect(await deployedContract.isAdmin(owner.address)).to.be.equal(true);
    expect(await deployedContract.isUser(owner.address)).to.be.equal(false);
  });

  it("Other user should not be admin", async () => {
    expect(await deployedContract.isAdmin(addr1.address)).to.be.equal(false);
    expect(await deployedContract.isUser(addr1.address)).to.be.equal(false);
  });

  it("Add account to user role", async () => {
    const USER_ADDRESS = await deployedContract.USER_ROLE();

    expect(USER_ADDRESS).to.be.equal(ROLE_ADDRESS_CONSTANT);

    expect(await deployedContract.isUser(addr1.address)).to.be.equal(false);

    expect(await deployedContract.addUser(addr1.address))
      .to.emit(deployedContract, "RoleGranted")
      .withArgs(USER_ADDRESS, addr1.address, owner.address);

    expect(await deployedContract.isUser(addr1.address)).to.be.equal(true);
  });

  it("Add account to admin role", async () => {
    const ADMIN_ADDRESS = await deployedContract.DEFAULT_ADMIN_ROLE();

    expect(ADMIN_ADDRESS).to.be.equal(ADMIN_ADDRESS_CONSTANT);
    expect(await deployedContract.isAdmin(addr2.address)).to.be.equal(false);

    expect(await deployedContract.addAdmin(addr2.address))
      .to.emit(deployedContract, "RoleGranted")
      .withArgs(ADMIN_ADDRESS, addr2.address, owner.address);

    expect(await deployedContract.isAdmin(addr2.address)).to.be.equal(true);
  });

  it("Add account to admin role", async () => {
    await deployedContract.addAdmin(addr3.address);

    expect(await deployedContract.isAdmin(addr3.address)).to.be.equal(true);

    expect(await deployedContract.connect(addr3).renounceAdmin())
      .to.emit(deployedContract, "RoleRevoked")
      .withArgs(ADMIN_ADDRESS_CONSTANT, addr3.address, addr3.address);

    // not admin, does nothing
    expect(await deployedContract.connect(addr1).renounceAdmin()).to.not.emit(
      deployedContract,
      "RoleRevoked"
    );
  });
});
