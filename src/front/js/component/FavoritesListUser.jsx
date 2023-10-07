import React, { useState, useEffect, useContext } from 'react';
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";
import "../../styles/mybookslist.css"
import { Link, useParams } from "react-router-dom";

export const FavoritesListUser = () => {
    
    const [favorite, setFavorite] = useState('');
    const {id} = useParams();
  
    const fetchGetFavorites = async (id) => {
      
      const url = `${process.env.BACKEND_URL}/users/${id}/favoritelistings/`;
  
      const request = {
        method: "GET",
      };
  
      const response = await fetch(url, request);
  
      if (response.ok) {
        const data = await response.json();
        setFavorite(data);
      } else {
        console.log("Error", response.status, response.statusText);
      }
    }
  
    const favoriteId = localStorage.getItem("user_id");; //cambiar este id por la variable del ID del usuario logueado
  
    useEffect(() => {
      fetchGetFavorites(favoriteId);
    }, []);
    
    return (

        <div className="MyBooksList-main">
            <h5>Libros favoritos</h5>
            <div className="MyBooksList-Component">
          {favorite.status !== undefined && favorite.status !== "" ? (
            favorite.articulos.map((item, index) => (
              <div key={index} className="MyBooksList-BookImg">
                <img src={photo} alt="" className="" />
                <p>{item.favorite_listing.listing_title}: <b>{item.favorite_listing.sale_price}€</b></p>
              </div>
            ))
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        </div>
    )
}
