// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

import "./SimpleNft.sol";

/**
 * @title Storage
 * @author Adam
 * @dev Storage permettant l'ajout des adresses dans les collections 
 */
contract Storage{
    event NewCollectionStored();
    ///@custom:collections pas besoin de getter du coup je l'ai mise en public
    Collection[] public collections;
    struct Collection {
        string name;
        string symbol;
        SimpleNft tokenContract;
        address owner;
        string description;
    }

    /**
    *@notice add a collection to the storage
    *@dev le premier require est pour quand même s'assurer qu'on se fasse pas dos
    *@param _name nom del a collection
    *@param _symbol symbol de la collection
    *@param _contractAddress address de la collection
    *@param _owner owner de la collection
    *@param _description description de la collection
    */

    function addCollection(
        string memory _name,
        string memory _symbol,
        SimpleNft _contractAddress,
        address _owner,
        string memory _description   
    )external{
        require(collections.length <= 3 gwei, "dos risk, contact admin");
        SimpleNft token = SimpleNft(_contractAddress);
        Collection memory tmp = Collection(_name, _symbol, token,_owner, _description);
        collections.push(tmp);
    }

    /**
    *@notice get collection by address
    *@dev get collection by address
    *@param _addr possede des nfts
    *@return Collection [] tableau de toutes les collections 
    */
    function getCollectionsOf(address _addr)external view returns(Collection [] memory){
        uint i;
        Collection [] memory tmp;
        for (uint256 index = 0; index < collections.length; index++) {
            if(collections[index].tokenContract.balanceOf(_addr) > 0){
                tmp[i] = collections[index];
                i ++;
            }
        }
        return tmp;
    }

    /**
    *@notice renvoie la 1ere collection ou se trouve le nft
    *@dev  renvoie la 1ere collection ou se trouve le nft
    *@param _addr address du nft
    *@return Collection renvoie une collection
    */
    function getCollection(SimpleNft _addr)external view returns(Collection memory){
        for (uint256 index = 0; index < collections.length; index++) {
            if(collections[index].tokenContract == _addr){
                return collections[index];
            }
        }
    }  

    /**
    *@notice get All Collections
    *@dev get All Collections
    *@return Collection [] tableau de toutes les collections 
    */
    function getAllCollections()external view returns(Collection [] memory){      
            return collections;
    }

}

