import { useParams } from 'react-router';
import "./ManageSell.css";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from '../../App';
import DisplayNft from '../DisplayNft/DisplayNft';
import contractNft from "../../contracts/SimpleNft.json";
import contractSale from "../../contracts/AuctionOrSale.json";
export default function ManageSell() {
    const context = useContext(ContractContext);
    const [data, setData] = useState({});
    const params = useParams();

    useEffect(() => {
      getData();
    }, [])
    
    console.log(params);

    const getData= async() => {
        const tokenContract = await new context.ContractVar.web3.eth.Contract(contractNft.abi, params.tokenAddress);
        const saleContract = await new context.ContractVar.web3.eth.Contract(contractSale.abi, params.contrat);
        const started = await saleContract.methods.started().call({from:context.ContractVar.accounts[0]});
        console.log(started);
        setData({tokenContract:tokenContract, saleContract:saleContract, started:started}); 

        await tokenContract.events.Approval()
          .on('data',async (event) => {
              if(event.returnValues.owner == context.ContractVar.accounts[0]){
                  await saleContract.methods.sell().send({from:context.ContractVar.accounts[0]});
              }
          })
          .on('changed', changed => console.log(changed))
          .on('error', err => console.log(err))
          .on('connected', str => console.log(str))
    }

    const vendre= async () => {
        await data.tokenContract.methods.approve(params.contrat, params.id).send({from:context.ContractVar.accounts[0]});
    }

    console.log(data);
  if(data.started===false){
    return(
        <div id="manageSell">
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}/>
        <button onClick={vendre}>Commencer la vente</button>
        </div>
    )
  }  
  return (
    <div id="manageSell">
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}/>
    </div>
  )
}
