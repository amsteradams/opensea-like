import React, {useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router';
import { ContractContext } from '../../App';
import DisplayNft from '../DisplayNft/DisplayNft';
import "./Selling.css";
export default function Selling() {
  const context = useContext(ContractContext);
  const params = useParams();
  const [statePrice, setStatePrice] = useState();
  const [stateTime, setStateTime] = useState(0);

  const setPriceInput = (e) => {
    setStatePrice(e)
  }

  const setTimeInput = (e) => {
    setStateTime(e)
  }
  const image = 'https://gateway.pinata.cloud/ipfs/' + params.uri;
  const sell = async () => {
      await context.ContractVar.contractSellingFactory.methods.newSaleOrAuction(params.collection, params.id, statePrice, stateTime).send({from:context.ContractVar.accounts[0]});
  }
  return (
    <div>
      <DisplayNft img={image} i={params.id} owner={params.collection} />
    <form>
      <input onChange={e => {setPriceInput(e.target.value)}} type='text' placeholder='prix en Wei'/>
      <label for='name'>Laissez à zero pour une vente directe</label>
      <input onChange={e => {setTimeInput(e.target.value)}} name='time' type='text' placeholder='temps en secondes' />
      <button type='submit' onClick={sell}>Vente</button>
    </form>
    </div>
  )
}
