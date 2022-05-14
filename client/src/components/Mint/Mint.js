import React,{useState, useContext, useEffect} from 'react'
import { ContractContext } from '../../App';
import "./Mint.css";
const axios =require('axios');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
require('dotenv').config();

export default function Mint(props) {
    const key = process.env.REACT_APP_PINATA_KEY;
    const secret = process.env.REACT_APP_PINATA_SECRET;
    const context = useContext(ContractContext);
    const [readableStream, setReadableStream] = useState();
    const pinFile = () => {
        const url = `https://api.pinata.cloud/data/testAuthentication`;
        return axios
            .get(url, {
                headers: {
                    pinata_api_key: 'your pinata api key',
                    pinata_secret_api_key: 'your pinata secret api key'
                }
            })
            .then(function (response) {
                //handle your response here
            })
            .catch(function (error) {
                //handle error here
            });
    };

    const mint = async () => {
        await props.contract.methods.mint().send({from:context.ContractVar.accounts[0]});
    }

    const onChange = (e) => {
        //setReadableStream(fs.createReadStream(e.target.files));
    }

    console.log(fs);
  return (
    <div>
    <input type='file' onChange={onChange}/>
    <button onClick={mint} id="mint-btn">Mint</button>
    </div>
  )
}
