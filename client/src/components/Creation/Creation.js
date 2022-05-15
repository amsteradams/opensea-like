import React,{useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';
import "./Creation.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Creation() {
    const context = useContext(ContractContext);
    const [stateName, setStateName] = useState();
    const [stateSymbol, setStateSymbol] = useState();
    const [stateDesc, setStateDesc] = useState();
    const [stateDeploy, setStateDeploy] = useState();
    context.ContractVar.contractNftFactory.events.ERC721Created(stateDeploy,context.ContractVar.accounts[0])
          .on('data', async (event) => {
              toast.success("Collection created with success");
              setTimeout(function() {window.location.href = "/profil"}, 3000);
          })
          .on('error', (err) => 
          {
            toast.error("Error : "+ err);
        }
    );   

    const setName = (e) => {
        setStateName(e);
    }
    const setSymbol = (e) => {
        setStateSymbol(e);
    }
    const setDesc = (e) => {
        setStateDesc(e);
    }
    const deploy = async () => {
        const test = context.ContractVar.contractNftFactory.methods.deployNewNft(stateName, stateSymbol, stateDesc).send({from:context.ContractVar.accounts[0]});
    }
  return (
    <>
    <ToastContainer/>
    <div id="ctn">
    <div id="creation">
        <h1>Créer une collection : </h1>
        <form id="create-items">
            <input onChange={e => {setName(e.target.value)}} type='text' placeholder='Collection name'/>
            <input onChange={e => {setSymbol(e.target.value)}} type='text' placeholder='Collection symbol'/>
            <input onChange={e => {setDesc(e.target.value)}} type="text" placeholder='Description' />
            <button onClick={deploy}>Créer</button>
        </form>
    </div>
    </div>
    </>
  )
}
