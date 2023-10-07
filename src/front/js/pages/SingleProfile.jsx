import React, { useState, useEffect } from 'react';
import "../../styles/myprofile.css";
import { Link, useParams } from "react-router-dom";
import { BooksListUser } from "../component/BooksListUser.jsx";
import { FavoritesListUser } from "../component/FavoritesListUser.jsx";
import { FollowingListUser } from "../component/FollowingListUser.jsx";

export const SingleProfile = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [activeTab, setActiveTab] = useState('books');
  const userId = localStorage.getItem("user_id");  // Aquí cambiamos token por user_id

  console.log(`UserID from localStorage: ${userId}`);
  console.log(`ID from URL: ${id}`); // Agregado para verificar el ID desde la URL

  async function toggleFavoriteUser() {
    try {
      if (!userId) {
        alert("Usuario no autenticado o ID de usuario no disponible");
        return;
      }

      const method = isFavorite ? 'DELETE' : 'POST';
      const url = isFavorite ? 
                  `${process.env.BACKEND_URL}/users/${userId}/favoriteusers/${id}` : 
                  `${process.env.BACKEND_URL}/users/${userId}/favoriteusers`;  
      const body = isFavorite ? null : JSON.stringify({ Seguir: id });
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(url, {
        method,
        headers,
        body
      });

      // Ejemplo simplificado
      const data = await resp.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_id", data.user_id);


      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar estado de favoritos");
      }

      setIsFavorite(!isFavorite);

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  }

  // Tus funciones existentes
  const handleBooksTabClick = () => setActiveTab('books');
  const handleFavoritesTabClick = () => setActiveTab('favorites');
  const handleFollowingTabClick = () => setActiveTab('following');

  const fetchGetUsers = async () => {
    const url = `${process.env.BACKEND_URL}/users/${id}`;
    const request = { method: "GET" };
    const response = await fetch(url, request);
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      console.log("Error", response.status, response.statusText);
    }
  };
  
  useEffect(() => {
    fetchGetUsers();
  }, []);

  return (
    <div className="MyProfile-main">
      {user.status !== undefined && user.status !== "" ? (
        <div className="MyProfile-Profile">
          <div className="MyProfile-Img">
            <img src={user.results.url} alt="" className="" />
          </div>
          <div className="MyProfile-User">
            <h4>{user.results.name} {user.results.last_name}</h4>
            <button className="SingleProfile-fav-button" onClick={() => toggleFavoriteUser(userId, id)}>
        <i className={`fa ${isFavorite ? 'fa-heart-broken' : 'fa-heart'}`}></i>
      </button>
            <h6 className="MyProfile-LocationIcon">
              <i className="fa-solid fa-location-dot"></i> {user.results.address.city}, {user.results.address.zip_code}
            </h6>
            <h6 className="MyProfile-StarIcon">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
              <i className="fa-regular fa-star"></i>
              <span>(6)</span>   {/* EN VEZ DE UN 6 UNA VARIABLE */}
            </h6>
          </div>
          <div className="MyProfile-ThreeElements">
            <div className={`MyProfile-ThreeElements-Books ${activeTab === 'books' ? 'active' : ''}`} onClick={() => setActiveTab('books')}>
              <i className={`fa-solid fa-book ${activeTab === 'books' ? 'active-icon' : ''}`}></i>
            </div>
            <div className={`MyProfile-ThreeElements-Favorites ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => setActiveTab('favorites')}>
              <i className={`fa-solid fa-heart ${activeTab === 'favorites' ? 'active-icon' : ''}`}></i>
            </div>
            <div className={`MyProfile-ThreeElements-Following ${activeTab === 'following' ? 'active' : ''}`} onClick={() => setActiveTab('following')}>
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="MyProfile-Components">
        <div className="MyProfile-MyBooksList" style={{ display: activeTab === 'books' ? 'block' : 'none' }}>
          <BooksListUser />
        </div>
        <div className="MyProfile-MyFavoritesList" style={{ display: activeTab === 'favorites' ? 'block' : 'none' }}>
          <FavoritesListUser />
        </div>
        <div className="MyProfile-MyFollowingList" style={{ display: activeTab === 'following' ? 'block' : 'none' }}>
          <FollowingListUser />
        </div>
      </div>
    </div>
  );
}