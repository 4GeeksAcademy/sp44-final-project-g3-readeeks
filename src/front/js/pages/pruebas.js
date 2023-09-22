import React, { useState } from "react";
import "../../styles/NewItem.css";

export const NewItem = () => {
  const [imageURL, setImageURL] = useState(""); // Estado para almacenar la URL de la imagen

  // Función para manejar el cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      const imageURL = URL.createObjectURL(file); // Crea una URL para el archivo
      setImageURL(imageURL); // Actualiza el estado con la URL de la imagen
    }
  };

  // Función para eliminar la imagen cargada
  const removeImage = () => {
    setImageURL(""); // Borra la URL de la imagen
  };

  return (
    <div>
      <div className="upload-product-card">
        <h1>Nuevo libro a la venta</h1>
        <div className="input-row">
          <div className="input-container">
            <h3>Titulo</h3>
            <input type="text" placeholder="Ingrese la información de la sección 1" className="custom-input" />
          </div>
          <div className="input-container">
            <h3>Precio</h3>
            <input type="text" placeholder="Ingrese la información de la sección 2" className="custom-input" />
          </div>
        </div>
        <div className="input-row">
          <div className="input-container">
            <h3>Descripción</h3>
            <input type="text" placeholder="Ingrese la información de la sección 3" className="custom-input" />
          </div>
          <div className="input-container">
            <h3>Estado</h3>
            <select>
              <option value="opcion1">Venta</option>
              <option value="opcion2">Reservado</option>
              <option value="opcion3">Vendido</option>
            </select>
          </div>
        </div>

        <h1>Fotos</h1>
        <div className="image-uploads">
          {imageURL ? ( // Si hay una imagen cargada, muestra la imagen
            <div>
              <img src={imageURL} alt="Imagen Cargada" />
              <button onClick={removeImage}>Cambiar Imagen</button>
            </div>
          ) : (
            Array.from({ length: 5 }, (_, index) => (
              <div key={index}>
                <label htmlFor={`file-input-${index + 1}`} className="custom-file-input">
                  <i className="fas fa-camera"></i>
                  <input
                    type="file"
                    accept="image/*"
                    id={`file-input-${index + 1}`}
                    onChange={handleFileChange} // Asigna la función de manejo de cambio
                  />
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};



