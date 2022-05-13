import React from 'react'
import "./Header.css";
export default function Header(props) {
  return (
    <header class="anor_fn_header">
  		<div class="container">
	    	<div class="header_in">
          <div class="header_left">
            <div class="fn_logo">Alyra nft's</div>                  
            </div>
            <div class="header_right fn_signin">
						  <a href="" onClick={props.data} class="anor_fn_button small">Metamask Connect</a>
					  </div>
                        
          
        </div>
      </div>
    </header>

  )
}