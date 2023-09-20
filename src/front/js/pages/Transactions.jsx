import React, { useState } from 'react';
import "../../styles/transactions.css";
import { TransactionsSell } from '../component/TransactionsSell.jsx';
import { TransactionsBuy } from '../component/TransactionsBuy.jsx';

export const Transactions = () => {
  const [activeTab, setActiveTab] = useState('compras');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="Transactions-wrapper">
      <h5>Mis transacciones</h5>

      <div className="Transactions-Option">
        <div
          className={`Transactions-Option1 ${
            activeTab === 'compras' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('compras')}
        >
          Mis Compras <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div
          className={`Transactions-Option2 ${
            activeTab === 'ventas' ? 'active' : ''
          }`}
          onClick={() => handleTabChange('ventas')}
        >
          Mis Ventas <i className="fa-solid fa-credit-card"></i>
        </div>
      </div>

      <div className="Transactions-Box">
        {activeTab === 'compras' ? (
          <div className="TransactionsBuyComponent">
            <TransactionsBuy />
          </div>
        ) : (
          <div className="TransactionsSellComponent">
            <TransactionsSell />
          </div>
        )}
      </div>
    </div>
  );
};