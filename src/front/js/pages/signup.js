import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Link } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	

	return (
		<div className="signup-page">
			<div className="signup-container">
				<h1 className="signup-title">Crea tu cuenta</h1>
				<div className="signup-input">
					<input type="text" placeholder="Nombre" />
				</div>
				<div className="signup-input">
					<input type="password" placeholder="email" />
				</div>
				<div className="signup-input">
					<input type="password" placeholder="password" />
				</div>
				<button className="signup-button">Regístrate</button>
				<p className="login-notice">
					¿Ya tienes una cuenta? <br/>
					<Link to="/login">Inicia sesión</Link>
				</p>
			</div>
		</div>
	);
};
