import React, { useState } from "react";
import "../../styles/NewItem.css";

export const NewItem = () => {
  const [imageURLs, setImageURLs] = useState(Array(4).fill("")); // Estado para almacenar las URL de las imágenes

  const handleEnviarProducto = async () => {
    try {
      // Reúne la información del producto
      const producto = {
        titulo: [], /* Obtén el valor del input de título */
        precio: [],/* Obtén el valor del input de precio */
        descripcion: [], /* Obtén el valor del input de descripción */
        estado: [], /* Obtén el valor del select de estado */
        imagenes: imageURLs.filter((url) => url !== ""), // Filtra las URLs de imágenes no vacías
      };
  
      // Envía la información del producto al servidor o API (sustituye la URL con la correcta)
      const response = await fetch("URL_DE_TU_API", {
        method: "POST", // Puedes usar el método HTTP adecuado (POST, PUT, etc.)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto), // Convierte el objeto a formato JSON
      });
  
      if (response.ok) {
        // Si la respuesta es exitosa, puedes mostrar un mensaje de éxito o redirigir a otra página
        alert("Producto enviado exitosamente");
        // Redirigir a otra página si es necesario
        // history.push("/otra-pagina");
      } else {
        // Si la respuesta es un error, puedes mostrar un mensaje de error o manejarlo de otra manera
        alert("Hubo un error al enviar el producto");
      }
    } catch (error) {
      console.error("Error al enviar el producto:", error);
    }
  };

  // Función para manejar el cambio de archivo
  const handleFileChange = (event, index) => {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      const imageURL = URL.createObjectURL(file); // Crea una URL para el archivo
      const newURLs = [...imageURLs];
      newURLs[index] = imageURL;
      setImageURLs(newURLs); // Actualiza el estado con la URL de la imagen
    }
  };

  // Función para eliminar una imagen cargada
  const removeImage = (index) => {
    const newURLs = [...imageURLs];
    newURLs[index] = ""; // Borra la URL de la imagen
    setImageURLs(newURLs);
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
            <select className="custom-select">
              <option value="opcion1">Venta</option>
              <option value="opcion2">Reservado</option>
              <option value="opcion3">Vendido</option>
            </select>
          </div>
        </div>

        <h1>Fotos</h1>
        <div className="image-uploads">
          {imageURLs.map((imageURL, index) => (
            <div key={index}>
              {imageURL ? (
                <div  className="contenedor-imagen" style={{ textAlign: "start" }}>
                  <img
                    src={imageURL}
                    alt={`Imagen ${index + 1}`}
                    style={{ width: "300px", height: "200px" }} // Tamaño fijo de la imagen
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
                    id={`file-input-${index + 1}`}
                    onChange={(event) => handleFileChange(event, index)} // Asigna la función de manejo de cambio
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
    </div>
  );
};
