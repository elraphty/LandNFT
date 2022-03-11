//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// security against multiple request
import "hardhat/console.sol";

contract LandMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    // number of items minting, number of transaction not sold
    // tokens total number - tokenId

    Counters.Counter private _tokenIds;
    Counters.Counter private _tokensSold;

    // determine the owner of the contract
    // charge a listing fee so the owner makes a commision

    address payable owner;

    /// deploying to matuc API is the same so you use ether as same as matic
    // thye both have 18 decimal
    // 0.045 is in cents

    uint256 listingPrice = 0.045 ether;

    // Stucct can act like objects
    struct LandToken {
        uint256 tokenId;
        address nftContract;
        string landAddress;
        string coordinates;
        string size;
        address payable landSeller;
        address payable landOwner;
        uint256 landPrice;
        bool sold;
    }

    // token  Id return which marketToken-  fetch which oine it id
    mapping(uint256 => LandToken) idToMarketToken;

    // listen to events from frontend applications
    event LandTokenMinted(
        uint256 indexed tokenId,
        address indexed nftContract,
        address indexed landSeller,
        address landOwner,
        uint256 landPrice,
        bool sold
    );

    constructor() {
        // set owner;
        owner = payable(msg.sender);
    }

    // get listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // two functions to interact with contract
    // 1. create a market item to put it up for sale
    // 2. create a market sale for buying and selling between parties

    function makeMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory landAddress,
        string memory coordinates,
        string memory size
    ) public payable nonReentrant {
        // nonReentrant is a modifier to prevent reentry attack

        require(price > 0, "Price must be at least one wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _tokenIds.increment();

        uint256 itemId = _tokenIds.current();

        //putting it up for sale - bool - no owner
        idToMarketToken[itemId] = LandToken(
            tokenId,
            nftContract,
            landAddress,
            coordinates,
            size,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        // NFT transaction
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit LandTokenMinted(
            tokenId,
            nftContract,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function createMarketSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketToken[itemId].landPrice;
        uint256 tokenId = idToMarketToken[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to continue"
        );

        // transfer the amount to the seller
        idToMarketToken[itemId].landSeller.transfer(msg.value);
        // transfer the token from contract address to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketToken[itemId].landOwner = payable(msg.sender);
        idToMarketToken[itemId].sold = true;

        _tokensSold.increment();

        payable(owner).transfer(listingPrice);
    }

    // function to fetchMarketItems - minting, buying ans selling
    // return the number of unsold items

    function fetchMarketTokens() public view returns (LandToken[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _tokensSold.current();
        uint256 currentIndex = 0;

        // looping over the number of items created (if number has not been sold populate the array)
        LandToken[] memory items = new LandToken[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketToken[i + 1].landOwner == address(0)) {
                uint256 currentId = i + 1;
                LandToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // return nfts that the user has purchased
    function fetchMyNFTs() public view returns (LandToken[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        // a second counter for each individual user
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].landOwner == msg.sender) {
                itemCount += 1;
            }
        }

        // second loop to loop through the amount you have purchased with itemcount
        // check to see if the owner address is equal to msg.sender

        LandToken[] memory items = new LandToken[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].landOwner == msg.sender) {
                uint256 currentId = idToMarketToken[i + 1].tokenId;
                // current array
                LandToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // function for returning an array of minted nfts
    function fetchItemsCreated() public view returns (LandToken[] memory) {
        // instead of .owner it will be the .seller
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].landSeller == msg.sender) {
                itemCount += 1;
            }
        }

        // second loop to loop through the amount you have purchased with itemcount
        // check to see if the owner address is equal to msg.sender

        LandToken[] memory items = new LandToken[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].landSeller == msg.sender) {
                uint256 currentId = idToMarketToken[i + 1].tokenId;
                LandToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
