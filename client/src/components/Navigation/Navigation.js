import React,{useState, useEffect, useContext} from 'react'
import "./Navigation.css";
import {
    Link
  } from "react-router-dom";
import Title from './Title/Title';
export default function Navigation() {
  return (
    <div id="navigation">
      <Title />
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Creation</Link></li>
            <li><Link to="/profil">Profil</Link></li>
        </ul>
    </div>
  )
}
