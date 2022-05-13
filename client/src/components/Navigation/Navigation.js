import React,{useState, useEffect, useContext} from 'react'
import "./Navigation.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
export default function Navigation() {
  return (
    <div id="navigation">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Creation</Link></li>
            <li><Link to="/collections">Collections</Link></li>
        </ul>
    </div>
  )
}
