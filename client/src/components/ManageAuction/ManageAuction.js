import { useParams } from 'react-router';
import "./ManageAuction.css";
import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from '../../App';
import DisplayNft from '../DisplayNft/DisplayNft';
import contractNft from "../../contracts/SimpleNft.json";
import contractSale from "../../contracts/AuctionOrSale.json";
export default function ManageAuction() {
    const context = useContext(ContractContext);
    const [data, setData] = useState({});
    const params = useParams();
    const [bool, setBool] = useState(false);
    const [input, setInput] = useState();

    useEffect(() => {
      getData();
    }, [])
    
    console.log(params);

    const getData= async() => {
        const tokenContract = await new context.ContractVar.web3.eth.Contract(contractNft.abi, params.tokenAddress);
        const saleContract = await new context.ContractVar.web3.eth.Contract(contractSale.abi, params.contrat);
        const started = await saleContract.methods.auctionStarted().call({from:context.ContractVar.accounts[0]});
        console.log(started);
        const price = await saleContract.methods.highestBid().call({from:context.ContractVar.accounts[0]});
        const ended = await saleContract.methods.ended().call({from:context.ContractVar.accounts[0]});
        const destroyed = await saleContract.methods.destroyed().call({from:context.ContractVar.accounts[0]});
        const endTimeStamp = await saleContract.methods.endAt().call({from:context.ContractVar.accounts[0]});
        const seller = await saleContract.methods.seller().call({from:context.ContractVar.accounts[0]})
        setData({tokenContract:tokenContract, saleContract:saleContract, started:started, price:price,ended:ended, destroyed:destroyed, endAt:endTimeStamp, seller:seller}); 
        await tokenContract.events.Approval()
          .on('data',async (event) => {
              if(event.returnValues.owner == context.ContractVar.accounts[0] && bool === false){
                  sell(saleContract);
              }
          })
          .on('changed', changed => console.log(changed))
          .on('error', err => console.log(err))
          .on('connected', str => console.log(str))

          await saleContract.events.Start()
          .on('data',async (event) => {
              setBool(true);
              window.location.reload();
          })
          .on('changed', changed => console.log(changed))
          .on('error', err => console.log(err))
          .on('connected', str => console.log(str))
    }
    const sell = async (contract) => {
        await contract.methods.start().send({from:context.ContractVar.accounts[0]});
    }

    const vendre= async () => {
        await data.tokenContract.methods.approve(params.contrat, params.id).send({from:context.ContractVar.accounts[0]});
    }

    const buy= async() => {
        if(input > 0){
        await data.saleContract.methods.bid().send({from:context.ContractVar.accounts[0], value:input});
        }
        else{alert('Value cant be nul')}
    }

    const withdraw = async () => {
        await data.saleContract.methods.withdrawAuction().send({from:context.ContractVar.accounts[0]});
    }

    const handleChange = (e) => {
        setInput(e);
    }

    const timestampToDate= (timestamp) => {
        var date = new Date(timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return(formattedTime);
    }
    console.log(data);
    console.log(data.seller);
  if(data.started===false && data.seller == context.ContractVar.accounts[0]){
    return(
        <div id="manageSell">
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>
        <button onClick={vendre}>Commencer l'enchere</button>
        {timestampToDate(data.endAt)}
        </DisplayNft>
        </div>
    )
  }  
  else if(data.started === false && data.seller != context.ContractVar.accounts[0]){
      return(
        <div id="manageSell">
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>
        En attente...
        </DisplayNft>
        </div>
      )
  }
  if(params.owner === context.ContractVar.accounts[0]){
    if(data.endAt > (Date.now() * 1000) && data.destroyed === false){
        return(
        <div>
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>{data.price} wei
        <button onClick={withdraw}>Retirer</button>
        {timestampToDate(data.endAt)}
        </DisplayNft>
        </div>
        )
    }
    else if(data.destroyed===true){
        return(
            <div>
            <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>{data.price} wei
            <p>Vente effectuée</p>
            {data.endAt}
            </DisplayNft>
            </div>
            )
    }
    else{
  return (
    <div id="manageSell">
        <DisplayNft img={'https://gateway.pinata.cloud/ipfs/' + params.uri} i={params.id} owner={params.owner}>{data.price} wei
        {timestampToDate(data.endAt)}</DisplayNft>
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
        <input onChange={e => {handleChange(e.target.value)}} type='text'/>
        <button onClick={buy}>Encherir</button>
        {timestampToDate(data.endAt)}
        </DisplayNft>       
        </div>
      )
  }
}
