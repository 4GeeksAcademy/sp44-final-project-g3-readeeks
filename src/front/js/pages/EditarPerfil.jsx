import React, { useState } from 'react';
import "../../styles/editarperfil.css";
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";

export const EditarPerfil = () => {

    return (

        <div className="EditarPerfil-wrapper">

            
            <div className="EditarPerfil-img-profile">
            <div className="EditarPerfil-img">
                <img src={photo} alt="" className="" />
            </div>

            <div className="EditarPerfil-profile">
                <h5>Nombre apellido <i class="fa-solid fa-gear"></i></h5>
                <h5>Email <i class="fa-solid fa-gear"></i></h5>
                <h5>Número de teléfono <i class="fa-solid fa-gear"></i></h5>
                <h5>Contraseña <i class="fa-solid fa-gear"></i></h5>
                <h5>Dirección <i class="fa-solid fa-gear"></i></h5>
                
    {/* LOS H5 TIENEN QUE SER LOS PLACEHOLDER, Y UNA VEZ HAGAS CLICK SELECCIONAS EL INPUT */}


            </div>
           
            </div>
        

        </div>

    )
}