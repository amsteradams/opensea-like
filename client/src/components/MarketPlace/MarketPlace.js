import React, {useState,useContext, useEffect} from 'react'
import { ContractContext } from '../../App';
import AuctionOrSaleContract from "../../contracts/AuctionOrSale.json";
import nftContract from "../../contracts/SimpleNft.json";
import DisplayNft from '../DisplayNft/DisplayNft';
import './MarketPlace.css';
import {Link} from "react-router-dom";
export default function MarketPlace() {
//::::::::::::::::::::::STATE:::::::::::::::::::::::::

    const[display, setDisplay] = useState('vente');
    const context = useContext(ContractContext);
    const [collections, setCollections] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [auctionNfts, setAuctionNfts] = useState([])
//::::::::::::::::::::USE EFFECTS::::::::::::::::::::::
    useEffect(() => {
      getCollections();
    }, [])
    
    useEffect(() => {
      getSaleNfts();
    }, [collections])

    //if displaying auctions : 

    useEffect(() => {
      getAuctionNfts();
    }, [auctions])

    useEffect(() => {
      if(display === 'vente'){
          getCollections();
          getSaleNfts();
      }
      else{
          getCollections();
          getAuctionNfts();
      }
    }, [display])
    
    

//::::::::::::::::::::FONCTIONS::::::::::::::::::::::::
    //get all auctionsOrSale contracts
    const getCollections = async() => {
        if(display === 'vente'){
            setCollections([]);
            const collec = await context.ContractVar.contractSellingFactory.methods.getAllSales().call({from:context.ContractVar.accounts[0]});
            setCollections(collec);
        }
        else{
            setAuctions([]);
            const collec = await context.ContractVar.contractSellingFactory.methods.getAllAuctions().call({from:context.ContractVar.accounts[0]});
            setAuctions(collec);
        }
    }
    //get selling nfts
    const getSaleNfts = async () => {
        const tmpArr = [];
        for(let i=0; i < collections.length; i++){
            const instance = new context.ContractVar.web3.eth.Contract(AuctionOrSaleContract.abi, collections[i]);
            const ended = await instance.methods.ended().call({from:context.ContractVar.accounts[0]});
            const destroyed = await instance.methods.destroyed().call({from:context.ContractVar.accounts[0]});
            const seller = await instance.methods.seller().call({from:context.ContractVar.accounts[0]});
            if(ended === false || context.ContractVar.accounts[0] === seller){
                console.log(seller)
                if(destroyed === false || context.ContractVar.accounts[0] === seller ){
                const tokenAddress = await instance.methods.nft().call({from:context.ContractVar.accounts[0]});
                const tokenId = await instance.methods.nftId().call({from:context.ContractVar.accounts[0]});
                const instanceToken = new context.ContractVar.web3.eth.Contract(nftContract.abi, tokenAddress);
                const uri= await instanceToken.methods.tokenURI(tokenId).call({from:context.ContractVar.accounts[0]});
                const started = await instance.methods.started().call({from:context.ContractVar.accounts[0]});
                const owner = await instance.methods.seller().call({from:context.ContractVar.accounts[0]});
                if(started === true){
                    const price = await instance.methods.highestBid().call({from:context.ContractVar.accounts[0]});
                    tmpArr.push(
                    <Link to={'/marketplace/' + owner + '/'+ tokenAddress +'/'+ collections[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
                else{
                    const price = 'not started';
                    tmpArr.push(
                    <Link to={'/marketplace/' + owner + '/'+ tokenAddress +'/'+ collections[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
            }
            }
            else if(ended === true && destroyed === false){
                console.log(seller)
                const tokenAddress = await instance.methods.nft().call({from:context.ContractVar.accounts[0]});
                const tokenId = await instance.methods.nftId().call({from:context.ContractVar.accounts[0]});
                const instanceToken = new context.ContractVar.web3.eth.Contract(nftContract.abi, tokenAddress);
                const uri= await instanceToken.methods.tokenURI(tokenId).call({from:context.ContractVar.accounts[0]});
                const started = await instance.methods.started().call({from:context.ContractVar.accounts[0]});
                const owner = await instance.methods.seller().call({from:context.ContractVar.accounts[0]});
                if(started === true){
                    const price = await instance.methods.highestBid().call({from:context.ContractVar.accounts[0]});
                    tmpArr.push(
                    <Link to={'/marketplace/' + owner + '/'+ tokenAddress +'/'+ collections[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
                else{
                    const price = 'not started';
                    tmpArr.push(
                    <Link to={'/marketplace/' + owner + '/'+ tokenAddress +'/'+ collections[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
            }
        }
        setNfts(tmpArr);
    }

    //get Auctions nfts
    const getAuctionNfts = async () => {
        const tmpArr = [];
        for(let i=0; i < auctions.length; i++){
            const instance = new context.ContractVar.web3.eth.Contract(AuctionOrSaleContract.abi, auctions[i]);
            const ended = await instance.methods.ended().call({from:context.ContractVar.accounts[0]});
            const destroyed = await instance.methods.destroyed().call({from:context.ContractVar.accounts[0]});
            const seller = await instance.methods.seller().call({from:context.ContractVar.accounts[0]});
            if(ended === false || context.ContractVar.accounts[0] === seller){
                console.log(seller)
                if(destroyed === false || context.ContractVar.accounts[0] === seller ){
                const tokenAddress = await instance.methods.nft().call({from:context.ContractVar.accounts[0]});
                const tokenId = await instance.methods.nftId().call({from:context.ContractVar.accounts[0]});
                const instanceToken = new context.ContractVar.web3.eth.Contract(nftContract.abi, tokenAddress);
                const uri= await instanceToken.methods.tokenURI(tokenId).call({from:context.ContractVar.accounts[0]});
                const started = await instance.methods.started().call({from:context.ContractVar.accounts[0]});
                const owner = await instance.methods.seller().call({from:context.ContractVar.accounts[0]});
                if(started === true){
                    const price = await instance.methods.highestBid().call({from:context.ContractVar.accounts[0]});
                    tmpArr.push(
                    <Link to={'/marketplace/auctions/' + owner + '/'+ tokenAddress +'/'+ auctions[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
                else{
                    const price = 'not started';
                    tmpArr.push(
                    <Link to={'/marketplace/auctions/' + owner + '/'+ tokenAddress +'/'+ auctions[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
            }
            }
            else if(ended === true && destroyed === false){
                console.log(seller)
                const tokenAddress = await instance.methods.nft().call({from:context.ContractVar.accounts[0]});
                const tokenId = await instance.methods.nftId().call({from:context.ContractVar.accounts[0]});
                const instanceToken = new context.ContractVar.web3.eth.Contract(nftContract.abi, tokenAddress);
                const uri= await instanceToken.methods.tokenURI(tokenId).call({from:context.ContractVar.accounts[0]});
                const started = await instance.methods.started().call({from:context.ContractVar.accounts[0]});
                const owner = await instance.methods.seller().call({from:context.ContractVar.accounts[0]});
                if(started === true){
                    const price = await instance.methods.highestBid().call({from:context.ContractVar.accounts[0]});
                    tmpArr.push(
                    <Link to={'/marketplace/auctions/' + owner + '/'+ tokenAddress +'/'+ auctions[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
                else{
                    const price = 'not started';
                    tmpArr.push(
                    <Link to={'/marketplace/auctions/' + owner + '/'+ tokenAddress +'/'+ auctions[i] + '/' + uri.substr(34) + '/' + tokenId} >
                    <DisplayNft key={tokenId} img={uri} i={tokenId} owner={owner}>{price}</DisplayNft>
                    </Link>)
                }
            }
        }
        setAuctionNfts(tmpArr);
    }
//::::::::::::::::::::ONEVENT FUNCTIONS:::::::::::::::::::

    const displaying = (str) => {
        setDisplay(str);
    }

//:::::::::::::::::::::::::RETURN:::::::::::::::::::::::::

  if(display === 'vente'){
      return(
      <div id='marketplace'>
        <div id='filters'>
            <button onClick={()=>{displaying('vente')}}>Ventes</button>
            <button onClick={()=>{displaying('auctions')}}>Encheres</button>
        </div>
          {nfts}
      </div>
      )
  }
  else{
      return(
          <div id="marketplace">
              <div id='filters'>
                <button onClick={()=>{displaying('vente')}}>Ventes</button>
                <button onClick={()=>{displaying('auctions')}}>Encheres</button>
            </div>
            {auctionNfts}
          </div>
      )
  }
}
