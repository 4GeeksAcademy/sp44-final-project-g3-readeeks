import React, { useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/home.css";
import { Link } from "react-router-dom";




export const ResultsSearch = () => {

    
    const { term } = useParams(); // Usar useParams para obtener el término de búsqueda
  
    const [books, setBooks] = useState([]); // Estado para guardar los libros
  
    useEffect(() => {
      // Llamar a tu API con el término de búsqueda (ajustar la URL según sea necesario)
      fetch(`${process.env.BACKEND_URL}/listings?title=${term}`)
        .then((response) => response.json())
        .then((data) => {
          setBooks(data.results); // Asumiendo que los resultados están en la propiedad 'results'
        });
    }, [term]);



    return (
        <div className="Home-wrapper">
          <div className="HomeList-main">
            <h1>Uno de estos libros es el que buscas</h1>
      
            <div className="HomeList-Component">
              {books && books.length > 0 ? (
                books.map((item, index) => {
                  let firstUrl = "";
      
                  // Comprobamos si item.album y item.album.url existen.
                  if (item && typeof item.url === "string") {
                    const urls = item.url.slice(1, -1).split(',');
                    firstUrl = urls[0].trim();
                  }
      
                  return (
                    <div key={index} className="HomeList-BookImg">
                      <Link to={"/product-view/" + item.id}>
                        <img src={firstUrl} alt={item.listing_title || 'Book Image'} className="" />
                        <p>
                          {item.listing_title}: <b>{item.sale_price}€</b>
                        </p>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );

}