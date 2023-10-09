import React, { useState, useEffect, useRef } from "react";
import { useNavigate  } from "react-router-dom";

import { Link } from "react-router-dom";
import bookIcon from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2-removebg-preview.png";
import "../../styles/navbar.css";

export const Navbar = ({ isAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showMoreLink, setShowMoreLink] = useState(false);
  const searchTimerRef = useRef(null);



  const navigate  = useNavigate (); // Hook de react-router-dom para acceder al historial

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };


  const clearSearch = () => {
    setSearchTerm('');
    setFilteredBooks([]);
  }
  

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
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
}, []);

//ESTO ES UNA MODIFICACION
useEffect(() => {
  if (searchTerm) {
    // Buscar libros
    fetch(`${process.env.BACKEND_URL}/listings?title=${searchTerm}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const bookResults = data.results.map(book => ({
        ...book,
        type: 'book'
      }));

      // Buscar todos los usuarios
      return fetch(`${process.env.BACKEND_URL}/users`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("Users from API:", data.results); // Consola para debug

        // Filtrar usuarios en el cliente
        const userResults = data.results
          .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(user => ({
            ...user,
            type: 'user'
          }));
        
        console.log("Filtered Users:", userResults); // Consola para debug

        return [...bookResults, ...userResults];
      });
    })
    .then(mergedResults => {
      if (mergedResults.length > 1) {
        setShowMoreLink(true);
        setFilteredBooks([mergedResults[0]]);
      } else {
        setShowMoreLink(false);
        setFilteredBooks(mergedResults);
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  } else {
    setFilteredBooks([]);   // Limpiar resultados cuando searchTerm esté vacío
    setShowMoreLink(false); // Desactivar el enlace "Mostrar más"
  }
}, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
  
    searchTimerRef.current = setTimeout(() => {
      clearSearch();
    }, 10000);  // Desaparecerá después de 10 segundos.
  }
  

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
      <form onSubmit={handleSubmitSearch} className="searcher">
    <input
      className="buscador"
      type="text"
      placeholder="Buscar"
      aria-label="Buscar"
      value={searchTerm}
      onChange={handleSearch}
    />
    {searchTerm && filteredBooks.length > 0 && (
      <div className="search-results">
        {filteredBooks.map((result) => (
          <Link key={result.id} to={result.type === 'book' ? `/product-view/${result.id}` : `/user/${result.id}`} onClick={clearSearch} className="goItem" >
            {result.type === 'book' ? <i className=  "IsearchBook fa-solid fa-book "></i> : <i className="IsearchUser fas fa-user"></i>}
            {result.type === 'book' ? result.listing_title : result.name}
          </Link>
        ))}
        {showMoreLink && (
          <Link to={`/search/${searchTerm}`} onClick={clearSearch} className="large-dots">
            <i className="fas fa-search"></i>
          </Link>
        )}
      </div>
    )}
  </form>
      <div className="navbar-buttons">
        {loggedIn ? (
          <>
            <Link to="/mi-perfil">
              <button className="loggedin-buttons">Perfil</button>
            </Link>
            <Link to="/new-book">
              <button className="loggedin-buttons">Subir producto</button>
            </Link>
            <Link to="/mis-transacciones">
              <button className="loggedin-buttons">Carrito</button>
            </Link>
            <Link to="/">
              <button className="loggedin-buttons" onClick={handleLogout}>
                Cerrar sesión
              </button>
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
                <li><Link to="/mi-perfil">Perfil</Link></li>
                <li><Link to="/new-book">Subir producto</Link></li>
                <li><Link to="/mis-transacciones">Carrito</Link></li>
                <li><a className="dropdown-item" onClick={handleLogout}>
                  Cerrar sesión
                </a></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login">Regístrate o inicia sesión</button>
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
                <li><Link to="/login" className="dropdown-item">Iniciar sesión</Link></li>
                <li><Link to="/signup" className="dropdown-item">Crear cuenta</Link></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
        }