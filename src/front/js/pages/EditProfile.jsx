import React, { useState } from 'react';
import "../../styles/editprofile.css";

export const EditProfile = () => {

    const [profileImg, setProfileImg] = useState(null);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [street, setStreet] = useState('');
    const [num, setNum] = useState('');
    const [floor, setFloor] = useState('');
    const [letter, setLetter] = useState('');
    const [zipCode, setZipCode] = useState('')
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const handleProfileImg = (event) => {
        const file = event.target.files[0];
        setProfileImg(file);
    };

    const handlePhone = (event) => {
        const inputValue = event.target.value.replace(/\D/g, ''); 
        if (inputValue.length <= 9) { 
            setPhone(inputValue);
        }
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleStreet = (event) => {
        setStreet(event.target.value);
    };

    const handleNum = (event) => {
        setNum(event.target.value);
    };

    const handleFloor = (event) => {
        setFloor(event.target.value);
    };

    const handleLetter = (event) => {
        setLetter(event.target.value);
    };

    const handleZipCode = (event) => {
        setZipCode(event.target.value);
    };

    const handleState = (event) => {
        setState(event.target.value);
    };

    const handleCity = (event) => {
        setCity(event.target.value);
    };

    // Envío de formulario

    const handleSubmitUser = (event) => {
        event.preventDefault();

    // Aquí puedes enviar los datos del perfil, incluyendo la imagen, dirección y código postal al servidor
    // Por ahora, simplemente mostraremos los datos en la consola
   
        // console.log('Imagen de perfil:', imagenPerfil);
        // console.log('Dirección:', direccion);
        // console.log('Código Postal:', codigoPostal);

    // Luego puedes realizar una solicitud al servidor para actualizar el perfil del usuario

    }

    const handleSubmitAddress = (event) => {
        event.preventDefault();

    // Aquí puedes enviar los datos del perfil, incluyendo la imagen, dirección y código postal al servidor
    // Por ahora, simplemente mostraremos los datos en la consola
   
        // console.log('Imagen de perfil:', imagenPerfil);
        // console.log('Dirección:', direccion);
        // console.log('Código Postal:', codigoPostal);

    // Luego puedes realizar una solicitud al servidor para actualizar el perfil del usuario

    }


    return (

        <div className="editprofile">

            <div className="myProfileNmyAddress">

            <div className="myProfile">

                <div className="myProfileImg">
                    <i class="fa-regular fa-image"></i>
                </div>

                <div className="myProfileD">
                    <h6>Nombre Apellido</h6>
                    <h6>Número de teléfono</h6>
                    <h6>Email</h6>
                </div>
                 
            </div>


            <div className="myAddress">

                <div className="myAddressLeft">
                <h6>Calle</h6>
                    <h6>Número</h6>
                    <h6>Planta</h6>
                    <h6>Letra/Número</h6>
                </div>
                <div className="myAddressRight">
                <h6>Código Postal</h6>
                    <h6>Provincia</h6>
                    <h6>Ciudad</h6>
                </div>

            </div>

            </div>
            
            <div className="editProfileFormNeditAddressForm">
            <div className="editProfileForm">

                <h2 className="editTitle">Editar perfil</h2>
                
                <form onSubmit={handleSubmitUser}>

                <div className="editProfileDivInputImg">
                    <label><b>Imagen de Perfil:</b></label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProfileImg} 
                    />
                </div>

                <div className="editProfileDivPhone">
                    <label><b>Número de teléfono:</b> +34</label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={handlePhone} 
                        placeholder='Teléfono'
                        maxLength={9}
                    />
                </div>

                <div className="editProfileDivEmail">
                    <label><b>Email:</b></label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={handleEmail}
                        placeholder='Email@mail.com'
                    />
                </div>

                <div className="editProfileDivPassword">
                    <label><b>Password:</b></label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePassword}
                        placeholder='Nueva contraseña'
                        maxLength={12}
                    />

                    <p>"Máximo 12 caracteres permitidos"</p>   
                </div>

            
                    <button type="submit">Guardar cambios de perfil</button>

                </form>
                
                

            </div>

            

            <div className="editAddressForm">

                <h2>Editar dirección</h2>
                
                <form onSubmit={handleSubmitAddress}>

                <div className="editAddressFormStreet">
                    <label><b>Calle:</b></label>
                    <input 
                        type="text" 
                        value={street} 
                        onChange={handleStreet}
                        placeholder='Nombre de la calle'
                        maxLength={100}
                    />
                </div>

                <div className="editAddressFormNum">
                    <label><b>Número:</b></label>
                    <input 
                        type="number" 
                        value={num} 
                        onChange={handleNum}
                        placeholder='Número bloque'
                    />
                </div>

                <div className="editAddressFormFloor">
                    <label><b>Planta:</b></label>
                    <input 
                        type="number" 
                        value={floor} 
                        onChange={handleFloor}
                        placeholder='Número de planta'
                    />
                </div>

                <div className="editAddressFormLetter">
                    <label><b>Letra:</b></label>
                    <input 
                        type="text" 
                        value={letter} 
                        onChange={handleLetter}
                        placeholder='Letra / Número de puerta'
                        maxLength={5}
                    />
                </div>

                <div className="editAddressFormZipCode">
                    <label><b>Código Postal:</b></label>
                    <input 
                        type="number" 
                        value={zipCode} 
                        onChange={handleZipCode}
                        placeholder='Código Postal'
                    />
                </div>

                <div className="editAddressFormState">
                    <label><b>Provincia:</b></label>
                    <input 
                        type="text" 
                        value={state} 
                        onChange={handleState}
                        placeholder='Provincia'
                        maxLength={20}
                    />
                </div>

                <div className="editAddressFormCity">
                    <label><b>Ciudad:</b></label>
                    <input 
                        type="text" 
                        value={city} 
                        onChange={handleCity}
                        placeholder='Ciudad'
                        maxLength={50}
                    />
                </div>

                <button type="submit">Guardar cambios de dirección</button>

                </form>
                
            </div>
            </div>

        </div>

    )
}