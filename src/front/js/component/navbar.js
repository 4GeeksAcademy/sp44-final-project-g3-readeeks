import React, { useState } from "react";
import { Link } from "react-router-dom";
import bookIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2-removebg-preview.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo-title">
        <div className="logo">
          <a href="#">
            <img className="Reedeeks-icon" alt="Reedeeks" src={bookIcon}></img>
          </a>
        </div>
        <h1 className="title">Reedeeks</h1>
      </div>
      <div className="searcher">
        <input
          className="buscador"
          type="text"
          placeholder="Buscar"
          aria-label="Buscar"
        />
      </div>
      <div className="buttons">
        <button className="login">Regístrate o inicia sesión</button>
        <button className="upload">Subir producto</button>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          {/* Utilizamos clases de Bootstrap 5 para el menú */}
          <ul className={`dropdown-menu ${menuOpen ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="#">Regístrate</a></li>
            <li><a className="dropdown-item" href="#">Inicia sesión</a></li>
            <li><a className="dropdown-item" href="#">Subir producto</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
