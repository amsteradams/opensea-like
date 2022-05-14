import React,{useState, useEffect, useContext} from 'react'
import "./DisplayNft.css";
export default function DisplayNft(props) {
  const [state, setState] = useState();
   useEffect(() => {
     fetchImg();
   }, [])
   const fetchImg= async () => {
     const result = await fetch(props.img).then((res) => res.json());
     setState(result.image);
   }
  return (
    <div id="nft">
        <img src={state}/>
        <p id="id">id#{props.i}</p>
        <p id="addOwner">{props.owner}</p>
    </div>
  )
}
