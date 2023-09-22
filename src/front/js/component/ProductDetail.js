import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/workspaces/sp44-final-project-g3-readeeks/src/front/styles/productDetail.css';
import { NewItem } from '../pages/NewItem';

export const ProductDetail = ({ product, onClose }) => {
  if (!product) return  <div>No hay detalles disponibles para este producto.</div>;

  const navigate = useNavigate();

  const handleModify = () => {
    navigate(`/modify-item/${product.id}`);
  };

  return (
    <div className="product-detail-page">
      <div className="ProductDetail_product-card">
        <h1>Detalles del Producto</h1>
        <br />
        <div className="ProductDetail_input-row">
          <div className="prod-detail-title">
            <p>Título: <strong>{product['Titulo del item']}</strong></p>
          </div>
          <div className="prod-detail-price">
            <p>Precio: <strong>{product['Precio de venta']}</strong></p>
          </div>
        </div>
        <div className="ProductDetail_input-row">
          <p>Descripción: <strong>{product['Descripcion']}</strong></p>
        </div>
        <div className="ProductDetail_image-uploads">
          <p>Fotos:</p>
          <div>
            {product.album && product.album["La url"] && product.album["La url"].map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt="Imagen del Producto" />
            ))}
          </div>
        </div>
        <div className="ProductDetail_send-button-container">
          <Link to="/new-book">
            <button className='ProductDetail_send-button' onClick={onClose}>Crear otro anuncio</button>
          </Link>
          <Link to="/">
            <button className='ProductDetail_send-button' onClick={onClose}>Volver al Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
