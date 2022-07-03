import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("RoleBasedNFT", () => {
  let deployedContract: any;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  const ipfsURI =
    "https://gateway.pinata.cloud/ipfs/QmTMWjohiPf75PvVB1BVe41JV21LR9Zk1FVpB3qQXL2Yjg";

  // SETUP
  beforeEach(async function () {
    const Contract = await ethers.getContractFactory("RoleBasedNFT");
    [owner, addr1, addr2] = await ethers.getSigners();

    deployedContract = await Contract.deploy();
    await deployedContract.deployed();
  });

  it("Owner should be admin", async () => {
    expect(await deployedContract.isAdmin(owner.address)).to.be.equal(true);
  });

  it("Should allow mint from the owner", async () => {
    const expectedTokenId = 1;
    expect(await deployedContract.createNFT(addr1.address, ipfsURI))
      .to.emit(deployedContract, "MintedWithRole")
      .withArgs(owner.address, addr1.address, expectedTokenId, ipfsURI, true);
  });

  it("Should fail when another user try to mint", async () => {
    await expect(
      deployedContract.connect(addr1).createNFT(addr2.address, ipfsURI)
    ).to.be.revertedWith("Restricted to admins.");
  });
});
