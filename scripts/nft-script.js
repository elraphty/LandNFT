// scripts/create-box.js
const { ethers } = require("hardhat");

async function main() {
  const LandNFT = await ethers.getContractFactory("LandNFT");
  const LandMarket = await ethers.getContractFactory("LandMarket");

  // const [minter] = await ethers.getSigners()

  const landMarket = await LandMarket.deploy();
  await landMarket.deployed();

  console.log("LandMarket deployed to:", landMarket.address);

  const landNFT = await LandNFT.deploy(landMarket.address);
  await landNFT.deployed();

  console.log("NFT deployed to:", landMarket.address);
}

main();