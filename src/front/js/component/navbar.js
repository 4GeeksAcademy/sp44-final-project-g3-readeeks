import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bookIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2-removebg-preview.png";
import "../../styles/navbar.css";

export const Navbar = ({isAuthenticated, onLogout}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClassName = isNavbarFixed ? "navbar fixed" : "navbar";
  
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  useEffect(() => {
    setLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className={navbarClassName}>
      <div className="logo-title">
        <div className="logo">
          <Link to="/" className="Readeeks">
            <img className="Reedeeks-icon" alt="Reedeeks" src={bookIcon} />
          </Link>
        </div>
        <h1 className="title">Readeeks</h1>
      </div>
      <div className="searcher">
        <input
          className="buscador"
          type="text"
          placeholder="Buscar"
          aria-label="Buscar"
        />
      </div>
      <div className="navbar-buttons">
        {loggedIn ? (
          <>
            <Link to="/mi-perfil">
              <button className="loggedin-buttons">Perfil</button>
            </Link>
            <Link to="/newbook">
              <button className="loggedin-buttons">Subir producto</button>
            </Link>
            <button className="loggedin-buttons">Carrito</button>
            <button className="loggedin-buttons" onClick={handleLogout}>Cerrar sesión</button>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
              </button>
              {/* Utilizamos clases de Bootstrap 5 para el menú */}
              <ul className={`dropdown-menu ${menuOpen ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="#">Perfil</a></li>
                <li><Link to="/newbook">Subir producto</Link></li>
                <li><a className="dropdown-item" href="#">Carrito</a></li>
                <li><a className="dropdown-item" onClick={handleLogout}>Cerrar sesión</a></li>
              </ul>
            </div>
        </>
        ) : (
          <>
            <Link to="/login">
                <button className="login">Regístrate o inicia sesión</button>
            </Link>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
              </button>
              {/* Utilizamos clases de Bootstrap 5 para el menú */}
              <ul className={`dropdown-menu ${menuOpen ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
                <li><Link to="/login" className="dropdown-item">Iniciar sesión</Link></li>
                <li><Link to="/signup" className="dropdown-item">Crear cuenta</Link></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
