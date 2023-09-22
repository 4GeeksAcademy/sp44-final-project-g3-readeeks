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

    // Added by VF:
    const toggleFavorites = async () => {
        try {
            if (isInFavorites) {
                // Remove the product from favorites
                const response = await fetch(`/users/${user.id}/favoritelistings/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setIsInFavorites(false);
                }
            } else {
                // Add the product to favorites
                const response = await fetch(`/users/${user.id}/favoritelistings/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setIsInFavorites(true);
                }
            }
        } catch (error) {
            console.error('Error toggling favorites:', error.message);
        }
    };
    //

    if (!product) return <div>Cargando...</div>;

    function setMainImage(imagePath) {
        const mainImage = document.querySelector('.ProductViewVendedor-main-image');
        mainImage.src = imagePath;
    }
    
    async function postFavoriteItems(userId, listingId) {
    try {
        const response = await fetch(`/users/${userId}/favoritelistings/${listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al añadir a favoritos");
        }

        alert(data.message);

    } catch (error) {
        console.error('Error al añadir a favoritos:', error.message);
        alert(error.message);
    }
}

return (
    <div className="product-view-page">
        <div className="ProductViewproduct-card">
            {/* Datos del vendedor, favoritos y botón */}
            <div className="product-title-container">
                {product.listing_title && (
                    <div className="product-title">                    
                        <h2>{product.listing_title}</h2>
                    </div>
                )}
                <div className="ProductViewFavoritos">
                    {/* <h6 className='contador_favoritos'>Favoritos: {product.favorite_counter}</h6> */}
                    {/* <button className="ProductViewVendedor-fav-button" onClick={() => postFavoriteItems(product.seller.id, product.id)}> */}
                    <button
                            className={`ProductViewVendedor-fav-button ${
                                isInFavorites ? 'added-to-favorites' : ''
                            }`}
                            onClick={toggleFavorites}
                            disabled={user && user.id === product.seller.id}
                        >
                    <i className="fa fa-heart"></i>
                </button>
                </div>
            </div>

            {/* Álbum de imágenes */}
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
            {/* Estado */}
            <div className="ProductViewEstado-container">
                <span>Disponibilidad: {product.status}</span>            
            </div>
            </div>
            {/* Descripción */}
            <div className="ProductViewDescripcion-container">
                <div>{product.description}</div>
            </div>

            {/* Botón de compra */}
            <div className="ProductViewCompra-container">
                <button className="ProductViewCompra-button">
                    Comprar
                </button>
            </div>

            {/* Libro */}
            {/* {product.book && (
                <div className="ProductViewLibro-container">
                    <label>Libro:</label>
                    <div>{product.book.title}</div>
                </div>
            )} */}
        </div>
    </div>
);
}
