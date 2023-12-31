import React, { useState, useEffect, useContext } from 'react';
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";
import "../../styles/mybookslist.css"
import { Link, useParams } from "react-router-dom";


export const BooksListUser = () => {

    const [book, setBook] = useState('');
    const { id } = useParams();
  
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
  
    const bookId = localStorage.getItem("user_id");; //cambiar este id por la variable del ID del usuario logueado
  
    useEffect(() => {
      fetchGetBooks(id);
    }, []);

    return (

        <div className="MyBooksList-main">
          <h5>Libros en venta</h5>

          <div className="MyBooksList-Component">
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
        </div>

      );   
};