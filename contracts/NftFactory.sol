// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

import "./Storage.sol";
import "./SimpleNft.sol";
contract NftFactory {
    event ERC721Created(address tokenAddress, address owner);

    Storage storageContract;

    constructor(address _storageAddress){
        storageContract = Storage(_storageAddress);
    }
    
    function deployNewNft(
        string memory _name,
        string memory _symbol,
        string memory _description
          )
        public
        returns (address)
    {
        SimpleNft  nft = new SimpleNft(_symbol, _name);
        emit ERC721Created(address(nft), msg.sender);
        storageContract.addCollection(_name, _symbol, nft, msg.sender, _description);
        return address(nft);
    }	
}