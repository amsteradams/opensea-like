import React,{useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';

import "../Header/Header.css";
import "./Collections.css";

import Collection from "./Collection/Collection";

export default function Collections(props) {
    const context = useContext(ContractContext);
    const[state, setState] = useState([]);
    const [elements, setElements] = useState([]);
    useEffect(() => {
    registeringCollect();
    }, [])

    useEffect(() => {
      const tmp = [];
        setElements([]);
      state.forEach(element => {
        tmp.push(<Collection key={element.tokenContract} element={element}></Collection>)
      });
      setElements(tmp);
    }, [state])

/*   const registeringCollect = async () => {
  const listCollections = await context.ContractVar.contractStorage.methods.getAllCollections().call({from:context.ContractVar.accounts[0]}); 
    setState(listCollections);
}  */

const registeringCollect = async () => {

  let listCollections=await context.ContractVar.contractStorage.methods.getAllCollections().call({from:context.ContractVar.accounts[0]}); 

if (props.data === "profil")
 listCollections  = listCollections.filter(x=>x.owner == context.ContractVar.accounts[0]);


  setState(listCollections);
}

  return (
  <div id="coll-ctn">
    {elements}
    </div>
    )
}