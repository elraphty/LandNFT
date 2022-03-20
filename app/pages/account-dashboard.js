
// we want to load the users nfts and display

import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { nftaddress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/LandNFT.sol/LandNFT.json'
import KBMarket from '../artifacts/contracts/LandMarket.sol/LandMarket.json'

export default function AccountDashBoard() {
    // array of nfts
  const [nfts, setNFts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(()=> {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    // what we want to load:
    // we want to get the msg.sender hook up to the signer to display the owner nfts

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
   
      // we want get the token metadata - json 
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.landPrice.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.landSeller,
        owner: i.landOwner,
        image: meta.data.image, 
        name: meta.data.name,
        description: meta.data.description,
        address: i.landAddress,
        size: i.landSize,
        coordinates: i.coordinates,
      }
      return item
    }))

    // create a filtered aray of items that have been sold
    const soldItems = items.filter(i=> i.sold)
    setSold(soldItems)
    setNFts(items)
    setLoadingState('loaded')
  }
  
  if(loadingState === 'loaded' && !nfts.length) return (<h1
  className='px-20 py-7 text-4x1'>You have not minted any NFTs!</h1>)

  return (
    <div className='p-4'>
        <h1 style={{fontSize:'20px', color:'purple'}}>Lands Minted</h1>
          <div className='px-4' style={{maxWidth: '1600px'}}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
            {
              nfts.map((nft, i)=>(
                <div key={i} className='border shadow rounded-x1 overflow-hidden'>
                  <img src={nft.image} />
                  <div className='p-2'>
                    <p style={{}} className='text-3x1 font-semibold'>{
                      nft.name}</p>
                      <div style={{}}>
                        <p className='text-gray-400'>{nft.description}</p>
                        <p className="text-gray-400">{nft.address}</p>
                        <p><span>{nft.size}</span> - <span>{nft.coordinates}</span></p>
                        </div>
                    </div>
                    <div className='p-2 bg-black'>
                        <p className='text-3x-1 mb-2 font-bold text-white'>{nft.price} ETH</p>
                      </div>
                </div>
              ))
            }
          </div>
          </div>
    </div>
  )
}