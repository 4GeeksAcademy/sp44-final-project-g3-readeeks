import React, { useState } from "react";
import {ProductDetail} from '/workspaces/sp44-final-project-g3-readeeks/src/front/js/component/ProductDetail.js';

import "../../styles/NewItem.css";



export const NewItem = () => {
  const [products, setProducts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(Array(4).fill(null));
  const [title, setTitle] = useState("");
  const [albumUrl, setAlbumUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");

  const handleFileChange = (event, index) => {
    console.log("Handling file change for index:", index);

    const file = event.target.files[0];
    console.log("Selected file:", file);

    const newFiles = [...selectedFiles];
    newFiles[index] = file;
    setSelectedFiles(newFiles);
};

const removeImage = (index) => {
    console.log("Removing image at index:", index);

    const newFiles = [...selectedFiles];
    newFiles[index] = null;
    setSelectedFiles(newFiles);
};

const uploadToCloudinary = async (file) => {
  console.log("Uploading file to Cloudinary:", file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); 

  try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dnxh8brpp/image/upload", {
          method: "POST",
          body: formData,
      });

      const data = await response.json();
      console.log("Cloudinary response:", data);
      return data.secure_url;
  } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
  }
};


const handleEnviarProducto = async (submittedProduct) => {
    console.log("Preparing to send product");

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
  }

    console.log("Sending product to backend:", product);

    try {
        const response = await fetch("https://scaling-guacamole-jx79vqq6676h565q-3001.app.github.dev/api/users/1/listings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        const responseData = await response.json();
        console.log("Backend response:", responseData);

        if (response.ok) {
            alert("Producto enviado exitosamente");
            setProducts(prevProducts => [...prevProducts, product]); // Usar el callback para evitar errores de estado desactualizado
        } else {
            alert("Hubo un error al enviar el producto");
        }
    } catch (error) {
        console.error("Error al enviar el producto:", error);
    }
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
                  style={{ width: "300px", height: "200px" }}
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

    <div className="productList">
      {products.map((product, index) => (
        <ProductDetail key={index} product={product} />
      ))}
    </div>
  </div>
);

}