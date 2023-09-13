import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";




export const Home = () => {
	const { store, actions } = useContext(Context);
  
	const [scrollX, setScrollX] = useState(0);
  
	const handleScrollLeft = () => {
	  // Desplaza la lista hacia la izquierda
	  if (scrollX > 0) {
		setScrollX(scrollX - 1);
	  }
	};
  
	const handleScrollRight = () => {
	  // Desplaza la lista hacia la derecha
	  if (scrollX < store.categories.length - 1) {
		setScrollX(scrollX + 1);
	  }
	};

  return (
    <div className="top-main">
      <main className="main-home">
        <section className="home_Home__hero__dKSyR d-flex flex-column">
          <h1 className="hero_Hero__title__RoscS d-flex flex-column align-items-center justify-content-center text-center">
            <strong className="hero_Hero__title--bold__tlxm8">
              Compra y vende libros de segunda mano en Readeeks
            </strong>
            <span>una comunidad que lleva años generando lecturas en el mundo</span>
          </h1>
          <form name="searchbox" className="w-100 d-flex searchbox-form_SearchBox__form__dJdo_ searcher-home">
            <div className="w-100 d-flex align-items-center searchbox-form_SearchBox__wrapper__6HWA_">
              
						  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="iconoSearcher">
							  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" fill="#DEA54B" />
							  <path d="M19.7071 18.2929L16.7071 15.2929C16.3166 14.9024 15.6834 14.9024 15.2929 15.2929C14.9024 15.6834 14.9024 16.3166 15.2929 16.7071L18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929Z" fill="#DEA54B" />
						  </svg>
              <input id="searchbox-form-input" type="search" placeholder="Busca tu libro" className="w-100 searchbox-form_SearchBox__input__kl64p" />
            </div>
            <button className="btn button_Button__4SB6a button_Button--submit__fDE0v align-items-center button-searcher-home" type="submit">
              Buscar
            </button>
          </form>
        </section>
        <div className="categories-container">
          <div className="scroll-container">
            <button className="scroll-button left" onClick={handleScrollLeft}>
              &lt; {/* Flecha izquierda */}
            </button>
            <ul className="categories-list"  >
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Todas las categorías</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Cómics</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Autobiográficos</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Científicos</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Autoayuda</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Aventuras</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Ciencia ficción</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Cuentos</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Deporte</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Humor</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Marketing</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">salud</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Suspense</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Videojuegos</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Novelas</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Novelas Románticas</span>
						</a>
					</li>
					<li class="categories_Categories__listitem__iJWwr h-100 text-center">
						<a href="" rel="nofollow" className="category_Category_All d-flex flex-column justify-content-center align-items-center" aria-labelledby="category-0">
							<span class="category_Category__title__qJiR3 text-center" id="category-0">Novela negra</span>
						</a>
					</li>
					</ul>
            <button className="scroll-button right" onClick={handleScrollRight}>
              &gt; {/* Flecha derecha */}
            </button>
          </div>
			<div class="popular-books">
				<h2>Libros Populares</h2>
					<ul class="popular-books-list">
	
					</ul>
</div>

        </div>
      </main>
    </div>
  );
};




						

