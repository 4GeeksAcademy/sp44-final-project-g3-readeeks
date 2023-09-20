import React, { useState, useEffect, useContext } from 'react';
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";
import "../../styles/mybookslist.css"

export const MyFollowingList = () => {
    const [following, setFollowing] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [cambioRealizado, setCambioRealizado] = useState(false);

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

    const handleDelete = async (userId, followedId) => {
        const url = `${process.env.BACKEND_URL}/users/${userId}/favoriteusers/${followedId}`;

        const request = {
            method: "DELETE",
        };

        const response = await fetch(url, request);

        if (response.ok) {
            // Handle successful deletion, e.g., remove the item from the state
            console.log("Item deleted successfully");
            setCambioRealizado(true);
        setTimeout(() => {
        setCambioRealizado(false);
        }, 3000);
        } else {
            console.log("Error", response.status, response.statusText);
        }
    }

    const followingId = 1; // Cambiar este id por la variable del ID del usuario logueado

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
                            <div className="MyBookList-Component-group">
                            <p>{item.name} {item.last_name}</p>
                            <button onClick={() => handleDelete(followingId, item.id)}><i className="fa-solid fa-trash"></i></button>
                            {cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i className="fa-solid fa-check"></i></div>}
                            </div>
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