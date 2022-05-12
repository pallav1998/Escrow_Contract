const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow_Contract", function () {
  let UserA, UserB, attacker;

  beforeEach(async () => {
    [UserA, UserB, attacker] = await ethers.getSigners();
    const EscrowContract = await ethers.getContractFactory("Escrow_Contract");
    Escrow = await EscrowContract.connect(UserA).deploy("10000", {
      value: 10000,
    });
    await Escrow.deployed();
  });

  it("Check Balance", async function () {
    const balance = await Escrow.getBalance();
    expect(balance).to.equal(10000);
  });

  it("Checking the owner address", async function () {
    const owner = await Escrow.user_A();
    expect(owner).to.equal(UserA.address);
  });

  it("Checking the work status", async function () {
    const workDone = await Escrow.work_done();
    expect(workDone).to.equal(false);
  });

  it("Check that the work is done by user B or not", async function () {
    const workDone = await Escrow.work_done();

    await Escrow.WorkDonebyUser_B();
    expect(await Escrow.WorkDonebyUser_B()).to.equal((workDone = true));
  });
});
