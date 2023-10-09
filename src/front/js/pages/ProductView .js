import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import "/workspaces/sp44-final-project-g3-readeeks/src/front/styles/productView.css"
import { Context } from '../store/appContext';

export const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isInFavorites, setIsInFavorites] = useState(false);
    const { user } = useContext(Context);

    function parseAlbumUrls(str) {
        return str.replace(/{|}/g, '').split(',');
    }
    
    useEffect(() => {
        console.log("Iniciando petición al servidor...");
        fetch(`${process.env.BACKEND_URL}/listings/${id}`)
    .then(res => {
        if (!res.ok) {
            throw new Error('Respuesta del servidor no fue exitosa');
        }
        return res.json();
    })
    .then(data => {
        console.log("Datos procesados:", data); 
        console.log("Álbum:", data.results.album);
        if (data.results.album) {
        data.results.album.url = parseAlbumUrls(data.results.album.url);
    }
    setProduct(data.results);
    })
    .catch(error => {
        console.error("Hubo un error obteniendo el producto:", error);
    });
    }, [id]);

    
    if (!product) return <div>Cargando...</div>;

    function setMainImage(imagePath) {
        const mainImage = document.querySelector('.ProductViewVendedor-main-image');
        mainImage.src = imagePath;
    }
    
   


// AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

const handleCompraButtonClick = async () => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/${userId}/transactions/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: "2023-10-02", // ajustar la fecha según tus necesidades
                total: 15, // ajustar el TOTAL según tus necesidades
                status: 'Procesando', // ajustar el estado según tus necesidades
            }),
        });

        if (response.ok) {
            alert('Añadido a transacciones');
        } else {
            throw new Error('Error en la transacción');
        }
    } catch (error) {
        console.error('Error al realizar la compra:', error.message);
        alert('Error al añadir a transacciones');
    }
};



const userId = localStorage.getItem("user_id");


const handleFavoriteButtonClick = async () => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}/favoritelistings/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Añadido a favoritos');
            setIsInFavorites(true);
        } else {
            throw new Error('Error al añadir a favoritos');
        }
    } catch (error) {
        console.error('Error al añadir a favoritos:', error.message);
        alert('Error al añadir a favoritos');
    }
};


return (
    <div className="product-view-page">
        <div className="ProductViewproduct-card">
            
            <div className="product-title-container">
                {product.listing_title && (
                    <div className="product-title">                    
                        <h2>{product.listing_title}</h2>
                    </div>
                )}
                <div className="ProductViewFavoritos">
                    
                    <button
                    className="ProductViewVendedor-fav-button"
                    onClick={handleFavoriteButtonClick}>
                        <i className="fa fa-heart"></i>
                    </button>
                </div>
            </div>

            
            <div className="ProductViewAlbum-container">
                {product.album && product.album.url && Array.isArray(product.album.url) && product.album.url.length > 0 && (
                    <div className="ProductViewAlbum">
                        <img className="ProductViewVendedor-main-image" src={product.album.url[0]} alt="Imagen principal" />
                        <div className={`ProductViewVendedor-sub-images ${product.album.url.length <= 1 ? 'hide-sub-images' : ''}`}>
                            {product.album.url.map((imgUrl, index) => (
                                <img key={index} src={imgUrl} alt={`Imagen ${index + 1} del álbum`} onClick={() => setMainImage(imgUrl)} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='precio-estado'>
            {/* Precio */}
            <div className="ProductViewPrecio-container">
                <h5>Precio: {product.sale_price}  €</h5>
            </div>
            </div>
            {/* Descripción */}
            <div className="ProductViewDescripcion-container">
                <div>{product.description}</div>
            </div>

            {/* Botón de compra */}
            <div className="ProductViewCompra-container">
                <button className="ProductViewCompra-button" onClick={handleCompraButtonClick}>
                    Lo quiero
                </button>
            </div>

        </div>
    </div>
);
}
