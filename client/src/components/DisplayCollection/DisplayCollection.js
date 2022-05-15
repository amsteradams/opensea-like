import React, {useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';
import "./DisplayCollection.css";
import { useParams } from 'react-router-dom';
import nftContract from '../../contracts/SimpleNft.json';
import DisplayNft from '../DisplayNft/DisplayNft';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mint from '../Mint/Mint';
export default function DisplayCollection() {
    const context = useContext(ContractContext);
    const [collection, setCollection] = useState([]);
    const [instance, setInstance] = useState();
    const [nfts, setNfts] = useState([]);
    const [index, setIndex] = useState(0);
    const param = useParams();

     useEffect(() => {
      getCollection();
    }, []) 

     useEffect(() => {
        getNftContract();
     }, [collection])

     useEffect(() => {
       getNfts();
     }, [instance])
     
    

    const getCollection = async () => {
        setCollection([]);
        const tmp = [];
        const collec = await context.ContractVar.contractStorage.methods.getCollection(param.id).call({from:context.ContractVar.accounts[0]});
        tmp.push(collec.name);
        tmp.push(collec.symbol);
        tmp.push(collec.owner);
        tmp.push(collec.description);
        setCollection(tmp);
    }
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
                let img = await instance.methods.tokenURI(i).call({from:context.ContractVar.accounts[0]});
                tmpArr.push([<DisplayNft img={img} key={i} i={i} uri={uri} owner={owner}/>]);
                i ++;
            }
            catch{
                setIndex(i);
                break;
            }
        } 
        setNfts(tmpArr);
        instance.events.Minted()
        .on('data', async (event) => {
            //toast.success("Nft created with success");
            
            console.log(event);
            if (event.returnValues._owner == context.ContractVar.accounts[0])
                setTimeout(function() {window.location.reload()}, 3000);
        })
        .on('error', (err) => 
        {
            toast.error("Error : "+ err);
        }
    );  
    }
    }
  return (
    <>
    <ToastContainer />  
    <div id="display-collection">
        <div id='up-part'>
            <div id='cName'>{collection[0]}</div>
            <div id="data">
            <div id='cAddress'>{param.id}</div>
            <div id='cdescription'>{collection[3]}</div>
            </div>
        </div>
        <Mint index={index} collection ={param.id} contract={instance}/>
        <div id='down-part'>
            {nfts}
        </div>
    </div>
    </>
  )
}
