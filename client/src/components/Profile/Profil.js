import React from 'react'
import Collections from '../Collections/Collections';
import DisplayListNft from '../DisplayListNft/DisplayListNft';
import "./Profil.css";
export default function Profil() {
  return (
      <div id="creation">
        <h1>Mes collections </h1>
        <div id='dCollec'>
      <Collections data="profil"/>
        </div>
        <h1>Mes NFT </h1>
        <div id='dNfts'>
      <DisplayListNft />
        </div>
      </div>
  )
}