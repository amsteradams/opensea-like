import React, {useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';
import "./DisplayListNft.css";
import { useParams } from 'react-router-dom';
import nftContract from '../../contracts/SimpleNft.json';
import DisplayNft from '../DisplayNft/DisplayNft';

export default function DisplayListNft() {
    const context = useContext(ContractContext);
    const [arr, setArr] = useState([]);
    const [elements, setElements] = useState([]);
    const [nfts, setNfts] = useState([]);
    useEffect(() => {
      getCollections();
    }, [])

    useEffect(() => {
        getAllCollections();
    }, [arr])
    
    useEffect(() => {
      getUserNfts();
    }, [elements])

    const getUserNfts = async () => {
        let tmpArr = [];
      for (let i = 0; i < elements.length; i++) {
        const instance = new context.ContractVar.web3.eth.Contract(
            nftContract.abi, elements[i]
        )
        const tmp = await instance.methods.balanceOf(context.ContractVar.accounts[0]).call({from:context.ContractVar.accounts[0]});
        if(tmp > 0){
            let i = 1;
            while(true){
                try{
                const owner = await instance.methods.ownerOf(i).call({from:context.ContractVar.accounts[0]});
                if(owner === context.ContractVar.accounts[0]){
                   const uri = await instance.methods.tokenURI(i).call({from:context.ContractVar.accounts[0]});
                   tmpArr.push(<DisplayNft img={uri} i={i} owner={context.ContractVar.accounts[0]}/>)     
                } 
                i++ 
            }catch(error){
                setNfts(tmpArr);
                break;
            } 
            }
        }
      }  
    }
    console.log(nfts);
    const getAllCollections = async () => {
        const tmp = [];
        setElements([]);
        arr.forEach(element => {
        tmp.push(element.tokenContract);
      });
      setElements(tmp);
    }
    console.log(elements);
    const getCollections= async () => {
        let listCollections=await context.ContractVar.contractStorage.methods.getAllCollections().call({from:context.ContractVar.accounts[0]});
        setArr(listCollections);
    }
  return (
    <div id="display-collection">
        {nfts}
    </div>
  )
}