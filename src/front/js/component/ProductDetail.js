import React from 'react';
import '/workspaces/sp44-final-project-g3-readeeks/src/front/styles/NewItem.css'; // Asumiendo que guardaste el CSS en un archivo con este nombre

export const ProductDetail = ({ product }) => {

  return (
    <div className="upload-product-card">
      <h1>Detalles del Producto</h1>
      <br></br>
      <div className="input-row">
        <div className="input-container">
          <label>Titulo:</label>
          <div>{product['Titulo del item']}</div>
        </div>
        <div className="input-container">
          <label>Precio:</label>
          <div>{product['Precio de venta']}</div>
        </div>
      </div>
      <div className="input-row">
        <label>Descripción:</label>
        <div>{product['Descripcion']}</div>
      </div>
      <div className="input-row">
        <label>Categoría:</label>
        <div>{product.category}</div>
      </div>
      <div className="image-uploads">
        <label>Imagen del Producto:</label>
              {product.album && product.album["La url"] && product.album["La url"].map((imgSrc, index) => (
                  <img key={index} src={imgSrc} alt="Imagen del Producto" />
              ))}

      </div>
      <div className="send-button-container">
        <button className="send-button">Volver</button>
      </div>
    </div>
  );
}

