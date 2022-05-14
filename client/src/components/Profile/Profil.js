import React from 'react'
import Collections from '../Collections/Collections';
import "./Profil.css";
export default function Profil() {
  return (
      <>
          <div id="ctn">
    <div id="creation">
    <h1>Mon Profil </h1>
    <br/>
    <h1>Mes collections </h1>
    <br/>
    <Collections data="profil"/>
    <h1>Mes NFT </h1>
    


    </div>
      
      </div>
      </>
  )
}