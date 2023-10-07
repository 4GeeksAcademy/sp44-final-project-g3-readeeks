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
  const [state1, setState1] = useState("");
  const [state2, setState2] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleKeyPress = (e) => {
    if (['E', 'e'].includes(e.key)) {
      e.preventDefault();
    }
  };

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
    setState1("");
    setState2("");
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

    const userId = localStorage.getItem("user_id");;

    const product = {
      "Titulo del item": title,
      "Precio de venta": price,
      "Descripcion": description,
      "Status": state2,
      "album": {
        "La url": imageUrls
      }
    };

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}/listings`, {
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
    setState1("");
    setState2("");
    setSelectedFiles(Array(4).fill(null));
  };


  return (
    <div className="upload-product-page">
      <div className="upload-product-card">
        <h1 className="upload-product-title">Nuevo libro a la venta</h1>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="listing-title">Titulo</label>
            <input
              type="text"
              id="listing-title"
              placeholder="Ingrese un título"
              className="custom-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="price-container-complete">
            <label htmlFor="listing-price">Precio</label>
            <div className="input-group input-group-sm input-container custom-input custom-price-input">
                <span className="input-group-text">€</span>
                <input 
                  type="number" 
                  id="listing-price"
                  placeholder="Precio de venta"
                  className="form-control" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
            </div>
          </div>
        </div>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="listing-description">Descripción</label>
            <textarea
              type="text"
              id="listing-description"
              placeholder="Exponga una breve descripción del producto"
              className="custom-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="listing-condition">Condición del libro</label>
            <select
              className="custom-select"
              value={state1}
              onChange={(e) => setState1(e.target.value)}
            >
              <option value="" disabled hidden>Seleccione una opción</option>
              <option value="Activo">Nuevo</option>
              <option value="Reservado">Usado - Como nuevo</option>
              <option value="Vendido">Usado - Buen estado</option>
              <option value="Cancelado">Usado - Regular</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="listing-state">Estado de la venta</label>
            <select
              className="custom-select"
              value={state2}
              onChange={(e) => setState2(e.target.value)}
            >
              <option value="" disabled hidden>Seleccione una opción</option>
              <option value="Activo">En Venta</option>
              <option value="Reservado">Reservado</option>
              <option value="Vendido">Vendido</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="photo-upload-title">
					<h5>Fotos</h5>
				</div>
        <div className="image-uploads">
          {selectedFiles.map((file, index) => (
            <div key={index}>
              {file ? (
                <div className="contenedor-imagen" style={{ textAlign: "start" }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Imagen ${index + 1}`}
                  />
                  <div style={{ display: "flex", alignItems: "center"}}>
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
            Crear
          </button>
        </div>
      </div>

      <Modal 
      isOpen={isModalOpen}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
      >

    <ProductDetail product={selectedProduct} onClose={handleModalClose} />
       
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