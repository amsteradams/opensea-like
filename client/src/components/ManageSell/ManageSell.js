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
    const [bool, setBool] = useState(false);

    useEffect(() => {
      getData();
    }, [])
    
    console.log(params);

    const getData= async() => {
        const tokenContract = await new context.ContractVar.web3.eth.Contract(contractNft.abi, params.tokenAddress);
        const saleContract = await new context.ContractVar.web3.eth.Contract(contractSale.abi, params.contrat);
        const started = await saleContract.methods.started().call({from:context.ContractVar.accounts[0]});
        console.log(started);
        const price = await saleContract.methods.highestBid().call({from:context.ContractVar.accounts[0]});
        const ended = await saleContract.methods.ended().call({from:context.ContractVar.accounts[0]});
        const destroyed = await saleContract.methods.destroyed().call({from:context.ContractVar.accounts[0]});
        setData({tokenContract:tokenContract, saleContract:saleContract, started:started, price:price,ended:ended, destroyed:destroyed}); 
        await tokenContract.events.Approval()
          .on('data',async (event) => {
              if(event.returnValues.owner == context.ContractVar.accounts[0] && bool === false){
                  sell(saleContract);
              }
          })
          .on('changed', changed => console.log(changed))
          .on('error', err => console.log(err))
          .on('connected', str => console.log(str))

          await saleContract.events.Sell()
          .on('data',async (event) => {
              setBool(true);
              window.location.reload();
          })
          .on('changed', changed => console.log(changed))
          .on('error', err => console.log(err))
          .on('connected', str => console.log(str))
    }
    const sell = async (contract) => {
        await contract.methods.sell().send({from:context.ContractVar.accounts[0]});
    }

    const vendre= async () => {
        await data.tokenContract.methods.approve(params.contrat, params.id).send({from:context.ContractVar.accounts[0]});
    }

    const buy= async() => {
        await data.saleContract.methods.buy().send({from:context.ContractVar.accounts[0], value:data.price});
    }

    const withdraw = async () => {
        await data.saleContract.methods.withdraw().send({from:context.ContractVar.accounts[0]});
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
  if(params.owner === context.ContractVar.accounts[0]){
    if(data.ended === true && data.destroyed === false){
        return(
        <div>
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>{data.price} wei
        <button onClick={withdraw}>Retirer</button>
        </DisplayNft>
        </div>
        )
    }
    else if(data.destroyed===true){
        return(
            <div>
            <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>{data.price} wei
            <p>Vente effectuée</p>
            </DisplayNft>
            </div>
            )
    }
    else{
  return (
    <div id="manageSell">
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>{data.price} wei</DisplayNft>
    </div>
  )
  }}
  else{
      if(data.ended === true){
          return (
            <div id="manageSell">
            <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>Vendu ! 
            </DisplayNft>       
            </div>
          )
      }
      return(
        <div id="manageSell">
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>{data.price} wei
        <button onClick={buy}>Acheter</button>
        </DisplayNft>       
        </div>
      )
  }
}
