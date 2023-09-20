import React, { useState, useEffect, useContext } from 'react';
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";
import "../../styles/mybookslist.css"

export const MyFollowingList = () => {
    
    const [following, setFollowing] = useState('');
  
    const fetchGetFollowings = async (id) => {
      
      const url = `${process.env.BACKEND_URL}/users/${id}/favoriteusers/`;
      
  
      const request = {
        method: "GET",
      };
  
      const response = await fetch(url, request);
  
      if (response.ok) {
        const data = await response.json();
        setFollowing(data);
      } else {
        console.log("Error", response.status, response.statusText);
      }
    }
  
    const followingId = 1; //cambiar este id por la variable del ID del usuario logueado
  
    useEffect(() => {
      fetchGetFollowings(followingId);
    }, []);
    
    return (

        <div className="MyBooksList-main">
            <h5>Siguiendo</h5>
            <div className="MyBooksList-Component">
          {following.status !== undefined && following.status !== "" ? (
            following.user_id.map((item, index) => (
              <div key={index} className="MyBooksList-BookImg">
                <img src={item.url} alt="" className="" />
                <p>{item.name} {item.last_name}</p>
              </div>
            ))
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        </div>
    )
}