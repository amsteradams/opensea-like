import React from 'react'
import "./Header.css";
export default function Header(props) {
  return (
    <header class="anor_fn_header">
		<div class="container">
			<div class="header_in">
                <div class="header_left">
                        <div class="fn_logo">
                            OPENSEA LIKE
                        </div>

                        <div class="nav_list">

						<ul class="main_menu">

                        {/* <li class="menu-item-has-children">
								<a href="/Collection">Create Collection</a>
                            </li>
							<li class="menu-item-has-children">
								<a href="/Collection">Create Nft</a>
                            </li>
							<li class="menu-item-has-children">
								<a href="/Collection">List All Collections</a>
                            </li>	
                            	 */}
							<li class="menu-item-has-children">
								<a href="/About">About</a>
                            </li>		

                        </ul>
                        </div>

                </div>
                <div class="fn_search">
						<input type="text" name="s" placeholder="Search NFT"/>
						<input type="submit" value=""/>			
                </div>

<div class="fn_signin">
						<a href="" onClick={props.data} class="anor_fn_button small">Metamask Connect</a>
					</div>
                        
            </div>
        </div>
            

    </header>

  )
}