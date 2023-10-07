import React, { useState, useEffect, useContext } from 'react';
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";
import "../../styles/mybookslist.css"
import { Link, useParams } from "react-router-dom";


export const MyBooksList = () => {

  // The below was here

    // const [book, setBook] = useState([]);
  
    // const fetchGetBooks = async (id) => {
      
    //   const url = `${process.env.BACKEND_URL}/users/${id}/listings`;
  
    //   const request = {
    //     method: "GET",
    //   };
  
    //   const response = await fetch(url, request);
  
    //   if (response.ok) {
    //     const data = await response.json();
    //     setBook(data);
    //   } else {
    //     console.log("Error", response.status, response.statusText);
    //   }
    // }
  
    // const bookId = localStorage.getItem("userId");
  
    // useEffect(() => {
    //   fetchGetBooks(bookId);
    // }, []);

    // The above was here 

    const [books, setBooks] = useState([]);

    const fetchGetBooks = async (id) => {
        const url = `${process.env.BACKEND_URL}/users/${id}/listings`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setBooks(data.results);
            } else {
                console.log("Error", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    const bookId = localStorage.getItem("userId");

  useEffect(() => {
    fetchGetBooks(bookId);
  }, [bookId]);

    return (

        <div className="MyBooksList-main">
          <h5>Libros en venta</h5>

          <div className="MyBooksList-Component">
            {books.status !== undefined && books.status !== "" ? (
              books.results.map((item, index) => (
                <div className="MyBooksList-BookImg">
                  <Link to={"/product-view/" + item.id}>
                  <img  key={index} src={item.album.url} alt="" className="" />
                  <p>{item.listing_title} <b>{item.sale_price}€</b></p>
                  </Link>
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

// import React, { useState, useEffect } from 'react';
// import "../../styles/mybookslist.css";
// import { Link } from "react-router-dom";

// export const MyBooksList = () => {
//   const [books, setBooks] = useState([]);

//   const fetchGetBooks = async (userId) => {
//     const url = `${process.env.BACKEND_URL}/users/${userId}/listings`;

//     try {
//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
//         setBooks(data.results);
//       } else {
//         console.log("Error", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   }

//   const bookId = localStorage.getItem("userId");

//   useEffect(() => {
//     fetchGetBooks(bookId);
//   }, [bookId]);

//   return (
//     <div className="MyBooksList-main">
//       <h5>Libros en venta</h5>
//       <div className="MyBooksList-Component">
//         {books.length > 0 ? (
//           books.map((item, index) => {
//             const urls = item.album.url.slice(1, -1).split(',');
//             const firstUrl = urls[0].trim();

//             return (
//               <div key={index} className="HomeList-BookImg">
//                 <Link to={"/product-view/" + item.id}>
//                   <img src={firstUrl} alt={item.listing_title} className="" />
//                   <p>
//                     {item.listing_title}: <b>{item.sale_price}€</b>
//                   </p>
//                 </Link>
//               </div>
//             );
//           })
//         ) : (
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };