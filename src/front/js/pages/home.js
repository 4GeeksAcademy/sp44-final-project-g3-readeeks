import React, { useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const [books, setBooks] = useState([]);

  const fetchGetBooks = async () => {
    try {
      const url = `${process.env.BACKEND_URL}/listings`;
      console.log(url)
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)

      // Reorganizar aleatoriamente los libros antes de seleccionar los primeros 12
      const shuffledBooks = data.results.sort(() => Math.random() - 0.5);
      setBooks(shuffledBooks.slice(0, 12));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchGetBooks();
  }, []);

  return (
    <div className="Home-wrapper">
      <div className="HomeList-main">
        <h1>Encuentra el libro perfecto para tu nueva aventura</h1>

        <div className="HomeList-Component">
          {books.length > 0 ? (
            books.map((item, index) => {
              const urls = item.url.slice(1, -1).split(','); 
              const firstUrl = urls[0].trim();

              return (
                <div key={index} className="HomeList-BookImg">
                  <Link to={"/product-view/" + item.id}>
                  <img src={firstUrl} alt={item.listing_title} className="" />
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
};
