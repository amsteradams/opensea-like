import React, { useState, useEffect } from "react";
import { createContext } from "react";
import getWeb3 from "./getWeb3";
import "./App.css";
import factoryContract from "./contracts/NftFactory.json";
import sellingFactoryContract from "./contracts/SellingFactory.json";
import storageContract from "./contracts/Storage.json";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./components/Header/HomePage";
import Home from "./components/Home/Home";

import Creation from "./components/Creation/Creation";

import Navigation from "./components/Navigation/Navigation";
import Collections from "./components/Collections/Collections";

export const ContractContext = createContext();

const App = () => {
  const [ContractVar, setContractVar] = useState({
    storageValue: [],
    web3: null,
    accounts: null,
    contractNftFactory: null,
    contractSellingFactory: null,
    contractStorage:null,
  });

  useEffect(() => {
    getContractVar();
  }, []);

  const getContractVar = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetworkNftFactory = factoryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        factoryContract.abi,
        deployedNetworkNftFactory && deployedNetworkNftFactory.address,
        );
      const deployedNetworkSellingFactory = sellingFactoryContract.networks[networkId];
      const instance1 = new web3.eth.Contract(
          sellingFactoryContract.abi,
          deployedNetworkSellingFactory && deployedNetworkSellingFactory.address,
          );
      const deployedNetworkStorage = storageContract.networks[networkId];
      const instance2 = new web3.eth.Contract(
          storageContract.abi,
          deployedNetworkStorage && deployedNetworkStorage.address,
          );
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods
        setContractVar({
          web3,
           accounts, 
           contractNftFactory: instance ,
           contractSellingFactory: instance1,
           contractStorage: instance2
        });

       // const { listCollections } = this.state;
       var  listCollections = await instance2.methods.getAllCollections.call(); 
        // this.setState({ listCollections });
       // console.log("listCollections="+listCollections.);
        
      } catch (error) {
        // Catch any errors for any of the above operations.
        console.log(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
  };

  if(ContractVar.web3){
    return (
      <BrowserRouter>
        <ContractContext.Provider value={{ ContractVar, setContractVar}}>
          <Navigation />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Creation />} />
          <Route path="/collection" element={<Collections  data={getContractVar}/>} />
             
              {/* <Route path="/create" element={} /> */}
          </Routes>
        </ContractContext.Provider>
      </BrowserRouter>
    );
  }
  else{
    return (
      <>
        <Header data={getContractVar}/>
        <HomePage/>
      </>
    )
  }
  
}

export default App;