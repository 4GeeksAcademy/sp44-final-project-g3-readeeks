import React, { useState, useEffect, useContext } from 'react';
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";
import "../../styles/mybookslist.css"


export const MyBooksList = () => {

    const [book, setBook] = useState('');
  
    const fetchGetBooks = async (id) => {
      
      const url = `${process.env.BACKEND_URL}/users/${id}/listings`;
  
      const request = {
        method: "GET",
      };
  
      const response = await fetch(url, request);
  
      if (response.ok) {
        const data = await response.json();
        setBook(data);
      } else {
        console.log("Error", response.status, response.statusText);
      }
    }
  
    const bookId = 1; //cambiar este id por la variable del ID del usuario logueado
  
    useEffect(() => {
      fetchGetBooks(bookId);
    }, []);

    return (

        <div className="MyBooksList-main">
          {book.status !== undefined && book.status !== "" ? (
            book.results.map((item, index) => (
              <div key={index} className="MyBooksList-BookImg">
                <img src={photo} alt="" className="" />
                <p>{item.listing_title}: <b>{item.sale_price}€</b></p>
              </div>
            ))
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        
      );   
};