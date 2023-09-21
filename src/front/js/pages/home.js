import React, { useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const [books, setBooks] = useState([]);

  const fetchGetBooks = async () => {
    try {
      const url = `${process.env.BACKEND_URL}/listings`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

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
        <h5>Encuentra el libro perfecto para tu nueva aventura</h5>

        <div className="HomeList-Component">
          {books.length > 0 ? (
            books.map((item, index) => (
              <div key={index} className="HomeList-BookImg">
                <img src={item.imageSrc} alt={item.listing_title} className="" />
                <p>
                  {item.listing_title}: <b>{item.sale_price}€</b>
                </p>
              </div>
            ))
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
