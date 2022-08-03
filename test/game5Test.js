const { assert } = require("chai");
const { ethers } = require("ethers");
const hre = require('hardhat');

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await hre.ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();


    const signer = hre.ethers.provider.getSigner(0);
     
    let wallet = ethers.Wallet.createRandom();
    while (wallet.address.slice(0,4) != '0x00') {
      wallet = ethers.Wallet.createRandom();
    }
    wallet = wallet.connect(hre.ethers.provider);

    signer.sendTransaction( {
      to: wallet.address,
      value: ethers.utils.parseEther('1.0')
    })

    console.log(await wallet.getBalance());

    // good luck


    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
