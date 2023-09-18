import React, { useState, useEffect } from 'react';
import "../../styles/editarperfil.css";
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";

export const EditarPerfil = () => {

    const [user, setUser] = useState('');
    const [newName, setNewName] = useState('');

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
    
    const handleNameChange = async () => {

      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`; //Puede que haya que cambiar el user.id por userId

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Nombre": newName
          })
      };

      const response = await fetch(url, request);

      if (response.ok) {
        console.log("Nombre actualizado correctamente");
        setUser(prevUser => ({ ...prevUser, results: { ...prevUser.results, name: newName } }));
    } else {
        console.error("Error al actualizar el nombre", response.status, response.statusText);
    }

    }

      const userId = 1; //cambiar este id por la variable del ID del usuario logueado
    
      useEffect(() => {
        fetchGetUsers(userId);
      }, []);



    return (

        <div className="EditarPerfil-wrapper">

            {user.status !== undefined && user.status !== "" ? (
            
            <div className="EditarPerfil-Profile">
            
            <div className="EditarPerfil-img">
                <img src={photo} alt="" className="" />
                {/* AÑADIR EL BOTON DE CAMBIAR DE IMAGEN */}
            </div>

            <div className="EditarPerfil-Information">
                <h5>{user.results.name}</h5>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button onClick={handleNameChange}>Cambiar Nombre</button>
            </div>

            </div>
            
            ) : (
                  
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
             
            )}

        </div>
    )
}