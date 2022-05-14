import React from 'react'
import "./DisplayNft.css";
export default function DisplayNft(props) {
  return (
    <div id="nft">
        <img src="/nft.png"/* {props.uri} *//>
        <p id="id">Id : {props.i}</p>
        <p id="addOwner">{props.owner}</p>
    </div>
  )
}
