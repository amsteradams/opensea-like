import React,{ useContext} from 'react'
import "./Avatar.css";
import { ContractContext } from '../../../App';

export default function Avatar() {
    const context = useContext(ContractContext);
    const myAccount = context.ContractVar.accounts[0];

  return (
      <>
    {/* <button><img height="40px" src="/img/avatar.png"/>{context.ContractVar.accounts[0]}</button> */}
    <div className="header_right fn_signin"><a href="/profil" className="anor_fn_button small">{myAccount.substring(0,5)}...{myAccount.substring(myAccount.length-3,myAccount.length)}</a></div>
    </>
  )
}