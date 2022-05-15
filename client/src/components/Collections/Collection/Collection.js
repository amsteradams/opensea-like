import React from 'react'
import {Link} from 'react-router-dom';
import "./Collection.css";
export default function Collection(props) {

    return (
        <Link id='lien' to={'/collection/' + props.element[2]}>
            <div id="coll-ctn">
                <div class="collection">
                    <img src='nft.png'></img>
                    <h3 class="fn_title"><a href="collection-single-items.html">{props.element[0]}</a></h3>
                    <p>Created by</p> <strong>{props.element[3]}</strong>
                </div>
            </div>
        </Link>
      )
  }