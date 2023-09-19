import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	const handleClick = () => {
		actions.login(email, password).then(() => {
		 	navigate("/")
		})
	}

	return (
		<div className="login-page">
				<div className="login-container">
					<h1 className="login-title">Inicia Sesión</h1>
					<div className="login-input">
						<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					</div>
					<div className="login-input">
						<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</div>
					<button className="login-button" onClick={handleClick}>Entrar</button>
					<p className="signup-notice">
						¿Aún no tienes una cuenta? <br/>
						<Link to="/signup">Regístrate</Link>
					</p>
				</div>
			</div>
	);
};