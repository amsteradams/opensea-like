import React from 'react'
import "./Header.css";
export default function Header(props) {
  return (
    <header className="anor_fn_header">
		<div className="container">
			<div className="header_in">
                <div className="header_left">
                        <div className="fn_logo">
                            OPENSEA LIKE
                        </div>

                        <div className="nav_list">

						<ul className="main_menu">

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
							<li className="menu-item-has-children">
								<a href="/About">About</a>
                            </li>		

                        </ul>
                        </div>

                </div>
                <div className="fn_search">
						<input type="text" name="s" placeholder="Search NFT"/>
						<input type="submit" value=""/>			
                </div>

<div className="fn_signin">
						<a href="" onClick={props.data} className="anor_fn_button small">Metamask Connect</a>
					</div>
                        
            </div>
        </div>
            

    </header>

  )
}