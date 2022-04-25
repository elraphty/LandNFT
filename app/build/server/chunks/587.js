"use strict";
exports.id = 587;
exports.ids = [587];
exports.modules = {

/***/ 838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ nftmarketaddress),
/* harmony export */   "k": () => (/* binding */ nftaddress)
/* harmony export */ });
const nftmarketaddress = '0x75EdCeB3dCC13030C4EEb9B47f8fEc7154e1c6d3';
const nftaddress = '0x1b368e4Cdbc05E82Ac28b76E3647940976292600';


/***/ }),

/***/ 743:
/***/ ((module) => {

module.exports = JSON.parse('{"Mt":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"nftContract","type":"address"},{"indexed":true,"internalType":"address","name":"landSeller","type":"address"},{"indexed":false,"internalType":"address","name":"landOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"landPrice","type":"uint256"},{"indexed":false,"internalType":"bool","name":"sold","type":"bool"}],"name":"LandTokenMinted","type":"event"},{"inputs":[{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"}],"name":"createMarketSale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"fetchItemsCreated","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"string","name":"landAddress","type":"string"},{"internalType":"string","name":"coordinates","type":"string"},{"internalType":"string","name":"size","type":"string"},{"internalType":"address payable","name":"landSeller","type":"address"},{"internalType":"address payable","name":"landOwner","type":"address"},{"internalType":"uint256","name":"landPrice","type":"uint256"},{"internalType":"bool","name":"sold","type":"bool"}],"internalType":"struct LandMarket.LandToken[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fetchMarketTokens","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"string","name":"landAddress","type":"string"},{"internalType":"string","name":"coordinates","type":"string"},{"internalType":"string","name":"size","type":"string"},{"internalType":"address payable","name":"landSeller","type":"address"},{"internalType":"address payable","name":"landOwner","type":"address"},{"internalType":"uint256","name":"landPrice","type":"uint256"},{"internalType":"bool","name":"sold","type":"bool"}],"internalType":"struct LandMarket.LandToken[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fetchMyNFTs","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"string","name":"landAddress","type":"string"},{"internalType":"string","name":"coordinates","type":"string"},{"internalType":"string","name":"size","type":"string"},{"internalType":"address payable","name":"landSeller","type":"address"},{"internalType":"address payable","name":"landOwner","type":"address"},{"internalType":"uint256","name":"landPrice","type":"uint256"},{"internalType":"bool","name":"sold","type":"bool"}],"internalType":"struct LandMarket.LandToken[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getListingPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftContract","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"landAddress","type":"string"},{"internalType":"string","name":"coordinates","type":"string"},{"internalType":"string","name":"size","type":"string"}],"name":"makeMarketItem","outputs":[],"stateMutability":"payable","type":"function"}]}');

/***/ }),

/***/ 377:
/***/ ((module) => {

module.exports = JSON.parse('{"Mt":[{"inputs":[{"internalType":"address","name":"marketplaceAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]}');

/***/ })

};
;