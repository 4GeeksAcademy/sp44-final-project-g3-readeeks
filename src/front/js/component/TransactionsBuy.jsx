import React, { useState, useEffect } from 'react';
import "../../styles/transactions.css";

export const TransactionsBuy = () => {
  const [user, setUser] = useState('');

  const fetchGetTransactions = async (id) => {
    const url = `${process.env.BACKEND_URL}/${id}/transactions`;
    const request = {
      method: "GET",
    };

    try {
      const response = await fetch(url, request);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  }

  const userId = localStorage.getItem("user_id");; // Cambiar este id por la variable del ID del usuario logueado

  useEffect(() => {
    fetchGetTransactions(userId);
  }, []);

  const handlePayViaPayPal = (transactionId) => {
    // Aquí deberías cargar el SDK de PayPal (por ejemplo, desde una URL externa o desde un script que lo incluya)
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AQg6MiAfma0yusrML1rRfWBjqfgdjazxhdap7p9HX8GE3wDrAs7M-kjO4lncusoV-Xpus4IYWKFG5LXR';
    script.async = true;
    script.onload = () => {
      // Verifica que haya un objeto user y que results sea un array antes de renderizar el botón de PayPal
      if (user && user.results && Array.isArray(user.results)) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            // ... Configuración para crear la orden de PayPal
            return actions.order.create({
              // ... Detalles de la orden
            });
          },
          onApprove: (data, actions) => {
            // ... Acciones cuando el pago es aprobado
          }
        }).render(`#paypal-button-container-${transactionId}`);
      } else {
        console.error('No se pudo renderizar el botón de PayPal. La estructura de datos es incorrecta.');
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div className="TransactionsSell-wrapper">
      {user.status !== undefined && user.status !== "" ? (
        user.results.map((item, index) => (
          <div key={index} className="Transactions-transaction">
            <h6>Vendedor: {item.seller.name} {item.seller.last_name}</h6>
            <h6>Libro: {item.listing.listing_title}</h6>
            <h6>Precio: {item.listing.sale_price}€</h6>
            <h6>Total: {item.listing.sale_price + 3}€</h6>
            <p><i>Gastos de envío incluidos</i></p>
            <div id={`paypal-button-container-${item.id}`}></div>
            <button onClick={() => handlePayViaPayPal(item.id)}>
              Pagar vía PayPal
            </button>
          </div>
        ))
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}
