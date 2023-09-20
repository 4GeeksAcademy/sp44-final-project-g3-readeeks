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
    <div className="ProductDetail_product-card"> 
      <h1>Detalles del Producto</h1>
      <br />
      <div className="ProductDetail_input-row">
        <div className="input-container">
          <label>Titulo:</label>
          <div>{product['Titulo del item']}</div>
        </div>
        <div className="ProductDetail_input-container">
          <label>Precio:</label>
          <div>{product['Precio de venta']}</div>
        </div>
      </div>
      <div className="ProductDetail_input-row">
        <label>Descripción:</label>
        <div>{product['Descripcion']}</div>
      </div>
      <div className="ProductDetail_input-row">
        <label>Categoría:</label>
        <div>{product.category}</div>
      </div>
      <div className="ProductDetail_image-uploads">
        <label>Imagen del Producto:</label>
        <div>
          {product.album && product.album["La url"] && product.album["La url"].map((imgSrc, index) => (                
              <img key={index} src={imgSrc} alt="Imagen del Producto" />
          ))}
        </div>
      </div>
      <div className="ProductDetail_send-button-container">
        <Link to="/newbook">
        <button className='ProductDetail_send-button' onClick={onClose}>Volver</button>
        </Link>
      </div>
    </div>
  );
}
