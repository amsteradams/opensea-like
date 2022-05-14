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

    const tmp = [];
    useEffect(() => {
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
      <>

<center>
<p className="fn_desc">Collections</p>
</center>
<div className="anor_fn_collection_list">

                    <ul className="anor_fn_list" data-cols="3" data-gap="40">

                    {elements}

                    </ul>

                    <div className="clearfix"></div>



                    {/* <div class="anor_fn_pagination">
                        <ul>
                            <li><span class="current">1</span></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><span class="dots">...</span></li>
                            <li><a href="#">12</a></li>
                        </ul>
                    </div> */}

                </div>
                </>
    )
}