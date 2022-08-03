const { assert } = require("chai");
const { ethers } = require("ethers");
const hre = require('hardhat');

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await hre.ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    const signer1 = hre.ethers.provider.getSigner(0);
    const signer2 = hre.ethers.provider.getSigner(1);
    const address1 = signer1.getAddress();
    const address2 = signer2.getAddress();

    // nested mappings are rough :}
    // BOTH WAYS WORK
    // await game.write(address1);
    await game.write(address2);

    // await game.win(address1);
    await game.connect(signer2).win(address1);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
