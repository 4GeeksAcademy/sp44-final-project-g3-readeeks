import React, { useState, useEffect } from "react";
import "../../styles/myprofile.css";
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";
import { MyBooksList } from "../component/MyBooksList.jsx"
import { MyFavoritesList } from "../component/MyFavoritesList.jsx"
import { MyFollowingList } from "../component/MyFollowingList.jsx";

export const MyProfile = () => {

  const [user, setUser] = useState('');

  const [activeTab, setActiveTab] = useState('books');

  const handleBooksTabClick = () => { 
    setActiveTab('books');
  };

  const handleFavoritesTabClick = () => { 
    setActiveTab('favorites');
  };

  const handleFollowingTabClick = () => { 
    setActiveTab('following');
  };

  const fetchGetUsers = async (id) => {
    
    const url = `${process.env.BACKEND_URL}/users/${id}`;

    const request = {
      method: "GET",
    };

    const response = await fetch(url, request);

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      console.log("Error", response.status, response.statusText);
    }
  }

  const userId = 1; //cambiar este id por la variable del ID del usuario logueado

  useEffect(() => {
    fetchGetUsers(userId);
  }, []);

  return (
    
    <div className="MyProfile-main">
      {user.status !== undefined && user.status !== "" ? (
                
      <div className="MyProfile-Profile">
        
        <div className="MyProfile-Img">
          <img src={photo} alt="" className="" />
        </div>

        <div className="MyProfile-User">
          <h4>{user.results.name} {user.results.last_name}</h4>

          <h6 className="MyProfile-LocationIcon">
            <i className="fa-solid fa-location-dot">
            </i> {user.results.address.city}, {user.results.address.zip_code}
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
        <div
          className={`MyProfile-ThreeElements-Books
          ${activeTab === 'books' ? 'active' : ''}`}
          onClick={handleBooksTabClick}
        >
          <i className={`fa-solid fa-book
            ${activeTab === 'books' ? 'active-icon' : ''}`}> 
          </i>
        </div>

        <div
          className={`MyProfile-ThreeElements-Favorites 
          ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={handleFavoritesTabClick}
        >
          <i className={`fa-solid fa-heart 
            ${activeTab === 'favorites' ? 'active-icon' : ''}`}>
          </i>
        </div>

        <div
          className={`MyProfile-ThreeElements-Following 
          ${activeTab === 'following' ? 'active' : ''}`}
          onClick={handleFollowingTabClick}
        >
            <i className="fa-solid fa-user">           
            </i>
          </div>

        </div>

      </div>
                                    
      ) : (
                  
          <div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
          </div>
       
      )}

      <div className="MyProfile-Components">
        
        <div className="MyProfile-MyBooksList"style={{ display: activeTab === 'books' ? 'block' : 'none' }}>
          <MyBooksList />
        </div>
        <div className="MyProfile-MyFavoritesList" style={{ display: activeTab === 'favorites' ? 'block' : 'none' }}>
          <MyFavoritesList />
        </div>
        <div className="MyProfile-MyFollowingList" style={{ display: activeTab === 'following' ? 'block' : 'none' }}>
          <MyFollowingList />
        </div>
        
      </div>
     
    </div>
            
  );
};
