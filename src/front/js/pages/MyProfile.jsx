import React from  "react";
import "../../styles/myprofile.css";

export const MyProfile = () => {

    return (

    <div className="myprofile">
        
        <div className="firstLine">
            
            <div className="firstLineLeft">

                <div className="profileIcon">

                    <i class="fa-regular fa-image"></i>

                </div>

                <div className="nameNrating">

                <div className="name">
                    <h2>Nombre Apellido</h2>
                </div>

                <a className="rating" href="">
                    <h5>Estrellitas</h5>
                </a>

                </div>
        
            </div>
        
            <div className="firstLineRight">
        
                <div className="city">
                    <h5><i class="fa-solid fa-location-dot"></i> Código Postal, Ciudad</h5>
                </div>

                <div className="date">
                    <h5><i class="fa-solid fa-street-view"></i> Miembro desde: 22-11-2020</h5>
                </div>
        
            </div>
        
        </div>

        <div className="secondLine">

            <a className="secondLineLeft" href="">
                <h4>Libros en venta</h4>
            </a>

            <a className="secondLineRight" href="">
                <h4>Valoraciones</h4>
            </a>

        </div>
    
    
            {/* PONER AQUI LOS COMPONENTES:
                    LIBROS EN VENTA
                    VALORACIONES */}





    </div>
    
    );
};