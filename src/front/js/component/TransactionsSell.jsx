import React, { useState, useEffect } from 'react';
import "../../styles/transactions.css";

export const TransactionsSell = () => {

    const [user, setUser] = useState('');

    const fetchGetTransactions = async (id) => {
    
        const url = `${process.env.BACKEND_URL}/${id}/transactionssell`;
    
        const request = {
          method: "GET",
        };
    
        const response = await fetch(url, request);
    
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log("Error", response.status, response.statusText);
        }
      }
    
      const userId = localStorage.getItem("user_id");; //cambiar este id por la variable del ID del usuario logueado
    
      useEffect(() => {
        fetchGetTransactions(userId);
      }, []);



   return (

    <div className="TransactionsSell-wrapper">

        {user.status !== undefined && user.status !== "" ? (
             
             user.results.map((item, index) => (
                
                <div key={index} className="Transactions-transaction">
                  
                  <h6>Comprador: {item.buyer.name} {item.buyer.last_name}</h6>
                  <h6>Libro: {item.listing.listing_title}</h6>
                  <h6>Precio: {item.listing.sale_price}€</h6>
                  <h6>Estado: {item.listing.status}</h6>
 
                </div>

              ))
            
            
              ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}



    </div>

   )
}