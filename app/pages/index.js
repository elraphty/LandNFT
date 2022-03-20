import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/LandNFT.sol/LandNFT.json';
import KBMarket from '../artifacts/contracts/LandMarket.sol/LandMarket.json';

export default function Home() {
  const [nfts, setNFts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    // what we want to load:
    // ***provider, tokenContract, marketContract, data for our marketItems***

    // const provider = new ethers.providers.JsonRpcProvider()
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      KBMarket.abi,
      provider
    );
    const data = await marketContract.fetchMarketTokens();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);

        // we want get the token metadata - json
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.landPrice.toString(), 'ether');

        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.landSeller,
          owner: i.landOwner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          address: i.landAddress,
          size: i.size,
          coordinates: i.coordinates,
        };
        return item;
      })
    );

    setNFts(items);
    setLoadingState('loaded');
  }

  // function to buy nfts for market

  async function buyNFT(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftmarketaddress,
      KBMarket.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );

    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-7 text-4x1">No Lands in marketplace</h1>;

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-x1 overflow-hidden">
              <img src={nft.image} />
              <div className="p-2">
                <p style={{}} className="text-3x1 font-semibold">
                  {nft.name}
                </p>
                <div style={{}}>
                  <p className="text-gray-400">{nft.description}</p>
                  <p className="text-gray-400">{nft.address}</p>
                  <p><span>{nft.size}</span> - <span>{nft.coordinates}</span></p>
                </div>
              </div>
              <div className="p-2 bg-black">
                <p className="text-3x-1 mb-2 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button
                  className="w-full bg-purple-500 text-white font-bold py-3 px-12 rounded"
                  onClick={() => buyNFT(nft)}>
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
