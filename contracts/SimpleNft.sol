// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SimpleNft is ERC721{
  event Minted(uint _tokenId, address _owner);
 uint private _tokenId;
 mapping(uint => string) uri;
 constructor(string memory _symbol, string memory _name)ERC721(_symbol, _name){
 }

 function mint(string memory _uri)public returns(uint){
   _tokenId +=1 ; 
   _mint(msg.sender, _tokenId);
   _setTokenUri(_tokenId, _uri);
   emit Minted(_tokenId, msg.sender);
   return _tokenId;
 }

 function _setTokenUri(uint _tId, string memory _uri)private{
   uri[_tId] = _uri;
 }

 function tokenURI(uint _tId)override public view returns(string memory){
   return uri[_tId];
 }

}
