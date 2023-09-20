import React, { useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const [books, setBooks] = useState([]);
  
	const fetchGetBooks = async () => {
	  try {
		const url = `https://ubiquitous-invention-pxpv4j6pvv5h74r9-3001.app.github.dev/api/listings`;
		const response = await fetch(url);
  
		if (!response.ok) {
		  throw new Error(`Error ${response.status}: ${response.statusText}`);
		}
  
		const data = await response.json();
		setBooks(data.results.slice(0, 12));  // Limit to 12 items
	  } catch (error) {
		console.error("Error fetching books:", error);
	  }
	};
  
	useEffect(() => {
	  fetchGetBooks();
	}, []);
  
	return (
	  <div className="Home-wrapper">
		<div className="MyBooksList-main">
		  <h5>Encuentra el libro perfecto para tu nueva aventura</h5>
  
		  <div className="MyBooksList-Component">
			{books.length > 0 ? (
			  books.map((item, index) => (
				<div key={index} className="MyBooksList-BookImg">
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
  
