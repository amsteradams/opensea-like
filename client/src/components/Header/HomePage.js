import React from 'react'
import "./Header.css";
export default function HomePage() {
  return (

<section id="discover">
		<div class="container">
			<div class="anor_fn_discover">
			
				<div class="discover_left">
					<div class="left_in">
						<div class="disc_desc">
							<h3>Discover Digital Art, Collect and Sell Your Specific NFTs.</h3>
							<p>Partner with world's first and largest NFT marketplace to showcase your brand and products.</p>
						</div>
						<div class="disc_info">
							<h3><span class="anor_fn_counter stop" data-from="0" data-to="200" data-speed="2000">200</span>K+</h3>
							<p>NFT Items</p>
						</div>

					</div>
				</div>

				<div class="discover_right">
					<div class="anor_fn_gallery_2_1">
						<div class="gallery_in">
							<div class="item">
								<img src="img/1.jpg" alt=""/>
							</div>
							<div class="item row2">
								<img src="img/2.jpg" alt=""/>
							</div>
							<div class="item">
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