import React,{useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';
import "./Home.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
export default function Home() {
  const context = useContext(ContractContext);
  return (
    <div id="home">
    </div>
  )
}
