// scripts/create-box.js
const { ethers } = require("hardhat");
const fs = require('fs');

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

  let config = `export const nftmarketaddress = \'${landMarket.address}\'; \rexport const nftaddress = \'${landNFT.address}\';`

  let data = JSON.stringify(config)
  fs.writeFileSync(`frontend/config.js`, JSON.parse(data))
}

main();