import React, { useState, useEffect, useContext } from 'react';
import "../../styles/prueba.css";
import { Context } from "../store/appContext.js";

export const Prueba = () => {
    
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("users"))
        );

    // const {store, actions} = useContext(Context); PARA QUE SIRVE?
    

    return (
        <div className='PruebaH1'>
            {user.message !== undefined && user.message !== "" ? (
                <h1>{user.results[0].name}</h1>
            ) : (
                <h1>Error</h1>
            )}
        </div>
    );
};