import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import  "../../styles/NewItem.css";

import { Context } from "../store/appContext";

export const NewItem = () => {
 
    return(
        <div>
            <h1>hola que handleScroll</h1>
        <div className="upload-product-card">
        <h1>Subir Producto</h1>
        <div className="input-row">
          <div className="input-container">
            <h3>Sección 1</h3>
            <input type="text" placeholder="Ingrese la información de la sección 1" className="custom-input" />
          </div>
          <div className="input-container">
            <h3>Sección 2</h3>
            <input type="text" placeholder="Ingrese la información de la sección 2" className="custom-input" />
          </div>
        </div>
        <div className="input-row">
          <div className="input-container">
            <h3>Sección 3</h3>
            <input type="text" placeholder="Ingrese la información de la sección 3" className="custom-input" />
          </div>
          <div className="input-container">
            <h3>Sección 4</h3>
            <select>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
          </div>
        </div>
      
        <h1>Fotos</h1>
        <div className="image-uploads">
        <label htmlFor="file-input-1" className="custom-file-input">
          <i className="fas fa-camera"></i> Subir Foto 1
        </label>
        <input
          type="file"
          accept="image/*"
          id="file-input-1"
        />
        <label htmlFor="file-input-1" className="custom-file-input">
          <i className="fas fa-camera"></i> Subir Foto 2
          </label>
          <input
          type="file"
          accept="image/*"
          id="file-input-2"
        />
        <label htmlFor="file-input-1" className="custom-file-input">
          <i className="fas fa-camera"></i> Subir Foto 3
          </label>
          <input
          type="file"
          accept="image/*"
          id="file-input-3"
        />
        <label htmlFor="file-input-1" className="custom-file-input">
          <i className="fas fa-camera"></i> Subir Foto 4
          </label>
          <input
          type="file"
          accept="image/*"
          id="file-input-4"
        />
        <label htmlFor="file-input-1" className="custom-file-input">
          <i className="fas fa-camera"></i> Subir Foto 5
          </label>
          <input
          type="file"
          accept="image/*"
          id="file-input-5"
        />
      </div>
      <button className="submit-button">
        Subir Producto
      </button>
    </div>
    </div>
    );
  };


