import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bookIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2-removebg-preview.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

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
      <div className="buttons">
        <button className="login">Regístrate o inicia sesión</button>
        <Link to="/newbook">
          <button className="upload">Subir producto</button>
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            onClick={toggleMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
          <ul
            className={`dropdown-menu ${menuOpen ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <a className="dropdown-item" href="#">
                Regístrate
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Inicia sesión
              </a>
            </li>
            <li>
              <Link to="/newbook" className="dropdown-item">
                Subir producto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
