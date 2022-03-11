//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; 

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract LandNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    
    address contractAddress;

    constructor(address marketplaceAddress) ERC721('KryotoBirds', 'KBIRDS') {
        contractAddress = marketplaceAddress;
    }

    function mintToken(string memory tokenURI) external  returns(uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        // SetToken Utri
        _setTokenURI(newItemId, tokenURI);

        // give marketplace approval ro transact between users
        setApprovalForAll(contractAddress, true);

        return newItemId;
    }
}