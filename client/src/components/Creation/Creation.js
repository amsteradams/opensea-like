import React,{useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';
import "./Creation.css";
export default function Creation() {
    const context = useContext(ContractContext);
    const [stateName, setStateName] = useState();
    const [stateSymbol, setStateSymbol] = useState();
    const [stateUri, setStateUri] = useState()

    const setName = (e) => {
        setStateName(e);
    }
    const setSymbol = (e) => {
        setStateSymbol(e);
    }
    const setUri = (e) => {
        setStateUri(e);
    }
    const deploy = async () => {
        const test = context.ContractVar.contractNftFactory.methods.deployNewNft(stateName, stateSymbol, stateUri).send({from:context.ContractVar.accounts[0]});
    }
  return (
    <div id="creation">
        <h1>Créer une collection : </h1>
        <form id="create-items">
            <input onChange={e => {setName(e.target.value)}} type='text' placeholder='Collection name'/>
            <input onChange={e => {setSymbol(e.target.value)}} type='text' placeholder='Collection symbol'/>
            <input onChange={e => {setUri(e.target.value)}} type="text" placeholder='Base Uri' />
            <button onClick={deploy}>Créer</button>
        </form>
    </div>
  )
}
