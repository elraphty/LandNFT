const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('LandMarket', function () {
  it('Should mint and trade NFTs', async function () {
    // test to receive contract addresses
    const Market = await ethers.getContractFactory('LandMarket');
    const market = await Market.deploy();

    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory('LandNFT');
    const nft = await NFT.deploy(marketAddress);

    await nft.deployed();

    const nftContractAddress = nft.address;

    // test to receive listing price and auction price
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits('100', 'ether');

    // test for minting
    await nft.mintToken('https-t1');
    await nft.mintToken('https-t2');

    await market.makeMarketItem(nftContractAddress, 1, auctionPrice, "hello", "jj", "kkk", {
      value: listingPrice,
    });
    await market.makeMarketItem(nftContractAddress, 2, auctionPrice, "hello2", "jj", "kkkj", {
      value: listingPrice,
    });

    // test for different addresses from different users - test accounts
    // return an array of however many addresses
    const [_, buyerAddress] = await ethers.getSigners();

    // create a market sale with address, id and price
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, {
      value: auctionPrice,
    });

    let items = await market.fetchMarketTokens();

    // console.log('Items ===', items);

    items = await Promise.all(
      items.map(async (i) => {
        // get the uri of the value

        const tokenUri = await nft.tokenURI(i.tokenId);

        let item = {
          landPrice: i.landPrice.toString(),
          tokenId: i.tokenId.toString(),
          landSeller: i.landSeller,
          landOwner: i.landOwner,
          tokenUri,
          size: i.size,
          coordinates: i.coordinates
        };

        return item;
      })
    );

    // test out all the items
    console.log('items', items);
  });
});
