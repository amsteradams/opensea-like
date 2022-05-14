import React from 'react'
import "./Header.css";
export default function HomePage() {
  return (

<section id="discover">
		<div className="container">
			<div className="anor_fn_discover">
			
				<div className="discover_left">
					<div className="left_in">
						<div className="disc_desc">
							<h3>Discover Digital Art, Collect and Sell Your Specific NFTs.</h3>
							<p>Partner with world's first and largest NFT marketplace to showcase your brand and products.</p>
						</div>
						<div className="disc_info">
							<h3><span className="anor_fn_counter stop" data-from="0" data-to="200" data-speed="2000">200</span>K+</h3>
							<p>NFT Items</p>
						</div>

					</div>
				</div>

				<div className="discover_right">
					<div className="anor_fn_gallery_2_1">
						<div className="gallery_in">
							<div className="item">
								<img src="img/1.jpg" alt=""/>
							</div>
							<div className="item row2">
								<img src="img/2.jpg" alt=""/>
							</div>
							<div className="item">
								<img src="img/3.jpg" alt=""/>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</section>

    )
}