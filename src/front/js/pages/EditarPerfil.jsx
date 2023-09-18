import React, { useState, useEffect } from 'react';
import "../../styles/editarperfil.css";
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";

export const EditarPerfil = () => {

    const [user, setUser] = useState('');

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

        <div className="EditarPerfil-wrapper">

            
            <div className="EditarPerfil-img-profile">
            
            <div className="EditarPerfil-img">
                <img src={photo} alt="" className="" />
            </div>


            
           
            </div>
        

        </div>

    )
}