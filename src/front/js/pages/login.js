import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleClick = () => {
		actions.login(email, password).then((response) => {
			 if (response && response.access_token && response.user_id) {
				// Aquí puedes guardar el token y el user_id en el localStorage
				localStorage.setItem("token", response.access_token);
				localStorage.setItem("userId", response.user_id);
			}
			 navigate("/")
			window.location.reload();
		})
	}

	return (
		<div className="login-page">
				<div className="login-container">
					<h1 className="login-title">Inicia Sesión</h1>
					<div className="login-input">
						<input type="text" placeholder="Dirección de email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					</div>
					<div className="login-input">
						<input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
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