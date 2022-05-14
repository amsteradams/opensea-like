import React, {useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';
import "./DisplayListNft.css";
import { useParams } from 'react-router-dom';
import nftContract from '../../contracts/SimpleNft.json';
import DisplayNft from '../DisplayNft/DisplayNft';

export default function DisplayListNft() {
    const context = useContext(ContractContext);
    const [collection, setCollection] = useState([]);
    const [instance, setInstance] = useState();
    const [nfts, setNfts] = useState([]);
    const param = useParams();

    useEffect(() => {
        getNftContract();
     }, [collection])

     useEffect(() => {
       getNfts();
     }, [instance])

     const getNftContract = async () => {
        try {
            const instance = new context.ContractVar.web3.eth.Contract(
                nftContract.abi, param.id
            )
            setInstance(instance);    
        } catch (error) {
            alert(error);
        }     
    }
   
    const getNfts = async () => {
        let i = 1;
        setNfts([]);
        let tmpArr = [];
        if(instance){
        while (true) {
            try{
                await instance.methods.ownerOf(i).call({from:context.ContractVar.accounts[0]});
                let uri = await instance.methods.tokenURI(i).call({from:context.ContractVar.accounts[0]});
                let owner = await instance.methods.ownerOf(i).call({from:context.ContractVar.accounts[0]});
                
                if (owner == context.ContractVar.accounts[0])
                    tmpArr.push([<DisplayNft key={i} i={i} uri={uri} owner={owner}/>]);
                    
                i ++;
            }
            catch{
                break;
            }
        } 
        setNfts(tmpArr);
    }
    }
  return (
    <div id="display-collection">
        <div id='down-part'>
            {nfts}
        </div>
    </div>
  )
}