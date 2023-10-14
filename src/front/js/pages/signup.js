import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
        name: "",
		last_name: "",
		document_type: "DNI",
		document_number: "",
		phone: "",
		email: "",
		password: "",
		street: "",
		number: "",
		floor: "",
		flat_number: "",
		zip_code: "",
		state: "",
		city: ""
    });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSignup = async () => {

		const url = `${process.env.BACKEND_URL}/signup`;
		console.log(url)
		try {
			const response = await fetch( url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
	
			if (response.status === 201) {
				// Registration successful, you can redirect or display a success message
				console.log('User registered successfully!');
				actions.login(formData.email, formData.password)
                .then(() => {
                    // Redirect the user to the home page after successful login
                    navigate("/");
					window.location.reload();
                })
                .catch((error) => {
                    console.error('Login failed:', error);
                });
			} else {
				// Handle errors, such as displaying an error message to the user
				console.error('Registration failed:', response.statusText);
				alert('There was an error during registration');
			}
		} catch (error) {
			// Handle network errors
			console.error('Network error:', error);
		}
	};
	
	return (
		<div className="signup-page">
			<div className="signup-container">
				<h1 className="signup-title">Crea tu cuenta</h1>
				<div className="signup-input">
					<div className="name-field">
						<input 
						type="text" 
						placeholder="Nombre"
						name="name"
						value={formData.name}
						onChange={handleInputChange} 
						/>
					</div>
					<div className="name-field">
						<input 
						type="text" 
						placeholder="Apellido"
						name="last_name"
						value={formData.last_name}
						onChange={handleInputChange} 
						/>
					</div>
				</div>
				<div className="signup-input login-details-input">
					<input 
					type="text" 
					placeholder="Dirección de email" 
					name="email"
					value={formData.email}
					onChange={handleInputChange}
					/>
				</div>
				<div className="signup-input login-details-input">
					<input 
					type="password" 
					placeholder="Contraseña" 
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					/>
				</div>
				<div className="signup-input">
					<div className="id-field">
						<label for="doc-type" className="id-label">Tipo de documento</label>
						<select 
							id="doc-type"
							name="document_type"
							value={formData.document_type}
							onChange={handleInputChange}
						>
							<option value="DNI">DNI</option>
							<option value="NIE">NIE</option>
							<option value="Passport">Pasaporte</option>
						</select>
					</div>
					<div className="id-field">
						<input 
						type="text" 
						placeholder="Número de documento" 
						name="document_number"
						value={formData.document_number}
						onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="signup-input">
					<input 
					type="text" 
					placeholder="Número de teléfono" 
					name="phone"
					value={formData.phone}
					onChange={handleInputChange}
					/>
				</div>
				<div className="address-title">
					<h5>Dirección</h5>
				</div>
				<div className="signup-input">
					<div className="address-street">
						<input 
						type="text" 
						placeholder="Calle" 
						name="street"
						value={formData.street}
						onChange={handleInputChange}
						/>
					</div>
					<div className="address-input-num">
						<input 
						type="text" 
						placeholder="Número" 
						name="number"
						value={formData.number}
						onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="signup-input">
					<div className="address-input-num">
						<input 
						type="text" 
						placeholder="Piso" 
						name="floor"
						value={formData.floor}
						onChange={handleInputChange}
						/>
					</div>
					<div className="address-input-num">
						<input 
						type="text" 
						placeholder="Puerta" 
						name="flat_number"
						value={formData.flat_number}
						onChange={handleInputChange}
						/>
					</div>
					<div className="address-zip">
						<input 
						type="text" 
						placeholder="Código Postal" 
						name="zip_code"
						value={formData.zip_code}
						onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="signup-input">
					<div className="address-geo">
						<input 
						type="text" 
						placeholder="Ciudad" 
						name="city"
						value={formData.city}
						onChange={handleInputChange}
						/>
					</div>
					<div className="address-geo">
						<input 
						type="text" 
						placeholder="Provincia" 
						name="state"
						value={formData.state}
						onChange={handleInputChange}
						/>
					</div>
					<div className="address-geo spain">
						<input type="text" placeholder="España" readOnly/>
					</div>
				</div>
				<button className="signup-button" onClick={handleSignup}>
					Crear cuenta
				</button>
				<p className="login-notice">
					¿Ya tienes una cuenta? <br/>
					<Link to="/login">Inicia sesión</Link>
				</p>
			</div>
		</div>
	);
};
