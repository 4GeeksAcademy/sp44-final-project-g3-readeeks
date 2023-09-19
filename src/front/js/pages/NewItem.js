import React, { useState } from "react";
import Modal from 'react-modal';
import { ProductDetail } from '/workspaces/sp44-final-project-g3-readeeks/src/front/js/component/ProductDetail.js';
import "../../styles/NewItem.css";

export const NewItem = () => {
  const [products, setProducts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(Array(4).fill(null));
  const [title, setTitle] = useState("");
  const [albumUrl, setAlbumUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);



  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const newFiles = [...selectedFiles];
    newFiles[index] = file;
    setSelectedFiles(newFiles);
  };

  const removeImage = (index) => {
    const newFiles = [...selectedFiles];
    newFiles[index] = null;
    setSelectedFiles(newFiles);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); 

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dnxh8brpp/image/upload", {
          method: "POST",
          body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const resetFields = () => {
    setSelectedFiles(Array(4).fill(null));
    setTitle("");
    setAlbumUrl("");
    setPrice("");
    setDescription("");
    setState("");
  };

  const handleEnviarProducto = async () => {
    const imageUrls = [];

    for (const file of selectedFiles) {
        if (file) {
            const url = await uploadToCloudinary(file);
            if (url) {
                imageUrls.push(url);
            }
        }
    }

    const product = {
      "Titulo del item": title,
      "Precio de venta": price,
      "Descripcion": description,
      "Status": state,
      "album": {
        "La url": imageUrls
      }
    };

    try {
        const response = await fetch("https://scaling-guacamole-jx79vqq6676h565q-3001.app.github.dev/api/users/1/listings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
          alert("Producto enviado exitosamente");
          setProducts(prevProducts => [...prevProducts, product]);
      
          console.log("Producto a establecer:", product); 
          setSelectedProduct(product);
      
          setIsModalOpen(true);
      } else {
          alert("Hubo un error al enviar el producto");
      }
    } catch (error) {
        console.error("Error al enviar el producto:", error);
    }
  };
    
  const handleModalOpen = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
};

const handleModalClose = () => {
    setIsModalOpen(false);
    // Reset fields
    setTitle("");
    setPrice("");
    setDescription("");
    setState("");
    setSelectedFiles(Array(4).fill(null));
};


return (
  <div>
    <div className="upload-product-card">
      <h1>Nuevo libro a la venta</h1>
      <div className="input-row">
        <div className="input-container">
          <h3>Titulo</h3>
          <input
            type="text"
            placeholder="Ingrese un titulo"
            className="custom-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <h3>Precio</h3>
          <input
            type="number"
            placeholder="Determine el precio de venta"
            className="custom-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="input-container">
          <h3>Descripción</h3>
          <input
            type="text"
            placeholder="Exponga una breve descripción del producto"
            className="custom-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-container">
          <h3>Estado</h3>
          <select
            className="custom-select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="" disabled hidden>Seleccione una opción</option>
            <option value="Activo">Venta</option>
            <option value="Reservado">Reservado</option>
            <option value="Vendido">Vendido</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <h1>Fotos</h1>
      <div className="image-uploads">
        {selectedFiles.map((file, index) => (
          <div key={index}>
            {file ? (
              <div className="contenedor-imagen" style={{ textAlign: "start" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Imagen ${index + 1}`}
                  />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button className="submit-button" onClick={() => removeImage(index)}>Cambiar Imagen</button>
                </div>
              </div>
            ) : (
              <label htmlFor={`file-input-${index + 1}`} className="custom-file-input">
                <i className="fas fa-camera"></i>
                <input
                  type="file"
                  accept="image/*"
                  name="img"
                  id={`file-input-${index + 1}`}
                  onChange={(event) => handleFileChange(event, index)}
                />
              </label>
            )}
          </div>
        ))}
      </div>
      <div className="send-button-container">
        <button className="send-button" onClick={handleEnviarProducto}>
          Enviar Producto
        </button>
      </div>
    </div>

    <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} ariaHideApp={false}>
    <ProductDetail product={selectedProduct} />

esto es una modificacion

      <button onClick={handleModalClose}>Cerrar</button>
    </Modal>

    {/* Aquí está la lista de productos (si aún deseas mostrarla fuera del modal) */}
    <div className="productList">
      {products.map((product, index) => (
        <div key={index} onClick={() => handleProductClick(product)}>
          {/* Aquí puedes poner un resumen o una miniatura del producto en lugar de todo el detalle */}
          
        </div>
      ))}
    </div>
  </div>
);

}