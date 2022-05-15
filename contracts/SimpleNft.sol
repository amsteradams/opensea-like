// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title SimpleNft
 * @author Adam
 * @dev Le contract permet de creer un nft 
 */
contract SimpleNft is ERC721{
  event Minted(uint _tokenId, address _owner);
 uint private _tokenId;
 mapping(uint => string) uri;
 constructor(string memory _symbol, string memory _name)ERC721(_symbol, _name){
 }

    /**
    *@dev mint nft
    *@notice creation d'un nft
    *@param _uri permet de mettre a jour l'uri
    *@return  _tokenId retourne l'id du nft
    */
 function mint(string memory _uri)public returns(uint){
   _tokenId +=1 ; 
   _mint(msg.sender, _tokenId);
   _setTokenUri(_tokenId, _uri);
   emit Minted(_tokenId, msg.sender);
   return _tokenId;
 }

    /**
    *@dev Mise a jour de l'uri du nft
    *@param _tId id du nft
    *@param _uri nouvelle uri du nft
    */
 function _setTokenUri(uint _tId, string memory _uri)private{
   uri[_tId] = _uri;
 }

    /**
    *@dev get l'uri
    *@notice get l'uri
    *@param _tId id du nft
    *@return  _uri retourne l'uri
    */
 function tokenURI(uint _tId)override public view returns(string memory){
   return uri[_tId];
 }

}
