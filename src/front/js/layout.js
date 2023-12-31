import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Single } from "./pages/single";
import { MyProfile } from "./pages/MyProfile.jsx"
import { EditarPerfil } from "./pages/EditarPerfil.jsx";
import { SingleProfile } from "./pages/SingleProfile.jsx";
import { Transactions } from "./pages/Transactions.jsx";
import { NewItem } from "./pages/NewItem";
import { ProductView } from "/workspaces/sp44-final-project-g3-readeeks/src/front/js/pages/ProductView .js"
import { ResultsSearch } from "/workspaces/sp44-final-project-g3-readeeks/src/front/js/component/ResultsSearch.js";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { ProductPreview } from "./component/ProductDetail";

import { login, logout } from "./store/flux";

import "/workspaces/sp44-final-project-g3-readeeks/src/front/styles/layout.css"

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        document.title = 'Readeeks - Libros de segunda mano';
      }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        state.actions.logout();
    };

    return (
        <div className="main-container">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<NewItem />} path="/new-book" />
                        <Route element={<ProductView />} path="/product-view/:id" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ResultsSearch />} path="/search/:term" />

                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<MyProfile />} path="/mi-perfil" />
                        <Route element={<EditarPerfil />} path="/editar-perfil" />
                        <Route element={<Transactions />} path="/mis-transacciones" />
                        <Route element={<SingleProfile />} path="/perfil/:id" />
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);