// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

import "./Storage.sol";
import "./SimpleNft.sol";

/**
 * @title NftFactory
 * @author Adam
 * @dev Le contract fournit une factory pour le deploiement d'une collection et d'un nft
 */
contract NftFactory {
    event ERC721Created(address tokenAddress, address owner);

    Storage storageContract;

    constructor(address _storageAddress){
        storageContract = Storage(_storageAddress);
    }
    
    ///@notice Creation d'une collection et d'un nft
    ///@param _name nom du nft
    ///@param _symbol symbole du nft
    ///@param _description description du nft
    /// @return  address l'address du nft
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