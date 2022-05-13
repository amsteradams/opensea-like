import React,{useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';

import "../Header/Header.css";
export default function Collections(props) {

  
    const context = useContext(ContractContext);

    //const listCollections =  props.data.contractStorage.methods.getAllCollections.call(); 
  // console.log("listCollection = "+listCollections);
//    const deploy = async () => {
//     context.ContractVar.contractStorage.methods.addCollection("col2","cc2","0x317C1171BceFB7B23258C2e3547C9188f8CE6e44","0x143c737990C9fd544D6A6226632883F5614958A0","");
//     const test = context.ContractVar.contractStorage.methods.getAllCollections.call(); 
//     console.log("test = "+test[0]);
//    }

  const registeringCollect = async () => {
    // try {
    // console.log("registeringCollect");
    //    context.ContractVar.contractStorage.methods.addCollection("col2","cc2","0x317C1171BceFB7B23258C2e3547C9188f8CE6e44","0x143c737990C9fd544D6A6226632883F5614958A0","").then(response => {
    //     alert('Enregistrement réussi', "ENREGISTREMENT");
    //   })
    // } catch (error) {
    //     console.log("error = "+error);
    //   alert(error, "ERREUR");
    // }

  //  const test1 = context.ContractVar.contractNftFactory.methods.deployNewNft("col2","cc2","").send({from:context.ContractVar.accounts[0]});
  const listCollections =  context.ContractVar.contractStorage.methods.getAllCollections().call(); 
  //const test =  context.ContractVar.contractStorage.methods.collections ;
  let divCol = listCollections.map((a) => <tr ><td>{a.name}</td></tr>)

 // console.log("test = "+test(0));
  console.log("divCol = "+divCol);
  }


  return (
      <>
      <button onClick={registeringCollect}>Créer</button>
<center>
<p class="fn_desc">Explore all collections</p>
</center>
<div class="anor_fn_collection_list">

					<ul class="anor_fn_list" data-cols="3" data-gap="40">
						
						<li>
							<div class="fn__collection_item">
								<div class="title_holder">
									<div class="author_img">
										<img src="img/author/3.jpg" alt=""/>
										<span class="icon">
											<svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 515.556 515.556" height="512" viewBox="0 0 515.556 515.556" width="512" class="fn__svg replaced-svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"></path></svg>
										</span>
										<a href="collection-single-items.html" class="full_link"></a>
									</div>
									<div class="author_info">
										<h3 class="fn_title"><a href="collection-single-items.html">Boss Beauties</a></h3>
										<p>Created by <a href="author-collected.html">Seekers</a></p>
									</div>
									<a href="#" class="anor_fn_like" data-id="" data-title="Boss Beauties">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -28 512.00002 512" class="fn__svg replaced-svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"></path></svg>
									</a>
								</div>


							</div>
						</li>
						
						<li>
							<div class="fn__collection_item">
								<div class="title_holder">
									<div class="author_img">
										<img src="img/author/2.jpg" alt=""/>
										<span class="icon">
											<svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 515.556 515.556" height="512" viewBox="0 0 515.556 515.556" width="512" class="fn__svg replaced-svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"></path></svg>
										</span>
										<a href="collection-single-items.html" class="full_link"></a>
									</div>
									<div class="author_info">
										<h3 class="fn_title"><a href="collection-single-items.html">MekaVerse Robots</a></h3>
										<p>Created by <a href="author-collected.html">Beeple</a></p>
									</div>
									<a href="#" class="anor_fn_like" data-id="" data-title="MekaVerse Robots">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -28 512.00002 512" class="fn__svg replaced-svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"></path></svg>
									</a>
								</div>


							</div>
						</li>
						
	                </ul>
					
					<div class="clearfix"></div>
					
					
					
					<div class="anor_fn_pagination">
						<ul>
							<li><span class="current">1</span></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><span class="dots">...</span></li>
							<li><a href="#">12</a></li>
						</ul>
					</div>
					
				</div>
                </>
    )
}