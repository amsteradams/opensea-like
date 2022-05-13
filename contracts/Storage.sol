// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;
///@author Adam

import "./SimpleNft.sol";
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
    *@param _contractAddress est l'addresse de la collection qu'on veut ajouter
    *@dev le premier require est pour quand même s'assurer qu'on se fasse pas dos
    //même si Cyril nous a dit que ça poserait pas de soucis, (un peu fait à l'arrache ça serait bien qu'on le modifie)
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
    *@return tableau de toutes les collections dont @param:_addr possede des nfts
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

    function getAllCollections()external view returns(Collection [] memory){      
            return collections;
    }

}

