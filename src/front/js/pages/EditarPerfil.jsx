import React, { useState, useEffect } from 'react';
import "../../styles/editarperfil.css";
import photo from "/workspaces/sp44-final-project-g3-readeeks/src/front/img/2.png";

export const EditarPerfil = () => {

    const [user, setUser] = useState('');
    
    const [cambioRealizado, setCambioRealizado] = useState(false);

    const [newName, setNewName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    

    const [newStreet, setNewStreet] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const fetchGetUsers = async (id) => {
    
        const url = `${process.env.BACKEND_URL}/users/${id}`;
    
        const request = {
          method: "GET",
        };
    
        const response = await fetch(url, request);
    
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log("Error", response.status, response.statusText);
        }
      }
    
    const handleNameChange = async () => {

      if (newName.trim() === '') {
        console.error('El nombre no puede estar vacío.');
        return; 
      }

      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`;

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Nombre": newName
          })
      };

      const response = await fetch(url, request);

      if (response.ok) {
        console.log("Nombre actualizado correctamente");
        setUser(prevUser => ({ ...prevUser, results: { ...prevUser.results, name: newName } }));
        setCambioRealizado(true);
        setTimeout(() => {
        setCambioRealizado(false);
        }, 3000); 
    } else {
        console.error("Error al actualizar el nombre", response.status, response.statusText);
    }

    }

    const handleLastNameChange = async () => {

      if (newLastName.trim() === '') {
        console.error('El Apellido no puede estar vacío.');
        return; 
      }

      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`;

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Apellidos": newLastName
          })
      };

      const response = await fetch(url, request);

      if (response.ok) {
        console.log("Apellido actualizado correctamente");
        setUser(prevUser => ({ ...prevUser, results: { ...prevUser.results, last_name: newLastName } }));
        setCambioRealizado(true);
        setTimeout(() => {
        setCambioRealizado(false);
        }, 3000); 
    } else {
        console.error("Error al actualizar el apellido", response.status, response.statusText);
    }
    }

    const handlePhoneChange = async () => {

      if (newPhone.trim() === '') {
        console.error('El teléfono no puede estar vacío.');
        return; 
      }

      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`;

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Telefono": newPhone
          })
      };

      const response = await fetch(url, request);

      if (response.ok) {
        console.log("Telefono actualizado correctamente");
        setUser(prevUser => ({ ...prevUser, results: { ...prevUser.results, phone: newPhone } }));
        setCambioRealizado(true);
        setTimeout(() => {
        setCambioRealizado(false);
        }, 3000); 
    } else {
        console.error("Error al actualizar el telefono", response.status, response.statusText);
    }
    }

    const handleEmailChange = async () => {

      if (newEmail.trim() === '') {
        console.error('El email no puede estar vacío.');
        return; 
      }

      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`;

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Email": newEmail
          })
      };

      const response = await fetch(url, request);

      if (response.ok) {
        console.log("Email actualizado correctamente");
        setUser(prevUser => ({ ...prevUser, results: { ...prevUser.results, email: newEmail } }));
        setCambioRealizado(true);
        setTimeout(() => {
        setCambioRealizado(false);
        }, 3000); 
    } else {
        console.error("Error al actualizar el email", response.status, response.statusText);
    }
    }

    const handlePasswordChange = async () => {

      if (newPassword.trim() === '') {
        console.error('El Password no puede estar vacío.');
        return; 
      }

      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`;

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Contraseña": newPassword
          })
      };

      const response = await fetch(url, request);

      if (response.ok) {
        console.log("Contraseña actualizado correctamente");
        setUser(prevUser => ({ ...prevUser, results: { ...prevUser.results, password: newPassword } }));
        setCambioRealizado(true);
        setTimeout(() => {
        setCambioRealizado(false);
        }, 3000); 
    } else {
        console.error("Error al actualizar el password", response.status, response.statusText);
    }
    }

    const handleStreetChange = async () => {
      if (newStreet.trim() === '') {
        console.error('La calle no puede estar vacía.');
        return;
      }
    
      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`;
    
      const request = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Direccion: {
            Calle: newStreet  // Modificar la calle de la dirección
            // Asegúrate de enviar las otras propiedades de la dirección si es necesario
          }
        })
      };
    
      const response = await fetch(url, request);
    
      if (response.ok) {
        console.log('Calle actualizada correctamente');
        // Actualiza la dirección en el estado del usuario si es necesario
        setUser(prevUser => ({
          ...prevUser,
          results: {
            ...prevUser.results,
            address: {
              ...prevUser.results.address,
              street: newStreet
            }
          }
        }));
        setCambioRealizado(true);
        setTimeout(() => {
          setCambioRealizado(false);
        }, 3000);
      } else {
        console.error('Error al actualizar la calle', response.status, response.statusText);
      }
    };

    const handleNumberChange = async () => {
      if (newNumber.trim() === '') {
        console.error('El número no puede estar vacío.');
        return;
      }
    
      const url = `${process.env.BACKEND_URL}/users/${user.results.id}`;
    
      const request = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Direccion: {
            Numero: newNumber  // Modificar el número de la dirección
            // Asegúrate de enviar las otras propiedades de la dirección si es necesario
          }
        })
      };
    
      const response = await fetch(url, request);
    
      if (response.ok) {
        console.log('Número actualizado correctamente');
        // Actualiza el número en la dirección del usuario si es necesario
        setUser(prevUser => ({
          ...prevUser,
          results: {
            ...prevUser.results,
            address: {
              ...prevUser.results.address,
              number: newNumber
            }
          }
        }));
        setCambioRealizado(true);
        setTimeout(() => {
          setCambioRealizado(false);
        }, 3000);
      } else {
        console.error('Error al actualizar el número', response.status, response.statusText);
      }
    };
    //useEffect////////////////////////////////////////////////////////////////////

      const userId = 1; //cambiar este id por la variable del ID del usuario logueado
    
      useEffect(() => {
        fetchGetUsers(userId);
      }, []);


    return (

        <div className="EditarPerfil-wrapper">

            {user.status !== undefined && user.status !== "" ? (
            
            <div className="EditarPerfil-Profile">
            
              <div className="EditarPerfil-img">
                  <img src={photo} alt="" className="" />
                  {/* AÑADIR EL BOTON DE CAMBIAR DE IMAGEN */}
              </div>

              <div className="EditarPerfil-Information">
                
                <h4>Editar Perfil</h4>

                <div className="EditarPerfil-Input">
                <h6>{user.results.name}</h6>
                <input type="text" value={newName} placeholder='Nuevo nombre' onChange={(e) => setNewName(e.target.value)} />
                <button onClick={handleNameChange}><i class="fa-solid fa-rotate-right"></i></button>
                {newName && cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i class="fa-solid fa-check"></i></div>}
                </div>

                <div className="EditarPerfil-Input">
                <h6>{user.results.last_name}</h6>
                <input type="text" value={newLastName} placeholder='Nuevo apellido/s' onChange={(e) => setNewLastName(e.target.value)} />
                <button onClick={handleLastNameChange}><i class="fa-solid fa-rotate-right"></i></button>
                {newLastName && cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i class="fa-solid fa-check"></i></div>}
                </div>

                <div className="EditarPerfil-Input">
                <h6>{user.results.phone}</h6>
                <input 
                  type="text" 
                  value={newPhone} 
                  placeholder='Nuevo teléfono' 
                  maxLength={9}
                  inputMode="numeric"
                  onChange={(e) => {
                  const phoneNumber = e.target.value.replace(/\D/g, '');
                  if (phoneNumber.length <= 9) {
                    setNewPhone(phoneNumber);
                  }
                  ;}} 
                  />
                <button onClick={handlePhoneChange}><i class="fa-solid fa-rotate-right"></i></button>
                {newPhone && cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i class="fa-solid fa-check"></i></div>}
                </div>

                <div className="EditarPerfil-Input">
                  <h6>{user.results.email}</h6>
                  <input type="text" value={newEmail} placeholder='Nuevo Email' onChange={(e) => setNewEmail(e.target.value)} />
                  <button onClick={handleEmailChange}><i class="fa-solid fa-rotate-right"></i></button>
                  {newEmail && cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i class="fa-solid fa-check"></i></div>}
                </div>

                <div className="EditarPerfil-Input">
                  <h6>Contraseña***</h6>
                  <input type="password" value={newPassword} placeholder='Nueva Contraseña' onChange={(e) => setNewPassword(e.target.value)} />
                  <button onClick={handlePasswordChange}><i class="fa-solid fa-rotate-right"></i></button>
                  {newPassword && cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i class="fa-solid fa-check"></i></div>}
                </div>

              </div>

              <div className="EditarPerfil-Information2">
                
                <h4>Editar Dirección</h4>
                <h6>
                  Dirección actual: {user.results.address.street}, nº {user.results.address.number}, Piso {user.results.address.floor}, Nº/Letra {user.results.address.flat_number}, {user.results.address.state}, {user.results.address.city}, {user.results.address.zip_code}
                </h6>
                
                
                <div className="EditarPerfil-Input2">
                  <input type="text" value={newStreet} placeholder='Nueva Calle' onChange={(e) => setNewStreet(e.target.value)} />
                  <button onClick={handleStreetChange}><i class="fa-solid fa-rotate-right"></i></button>
                  {newStreet && cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i class="fa-solid fa-check"></i></div>}
                </div>

                <div className="EditarPerfil-Input2short">
                  <input type="text" value={newNumber} placeholder='Nuevo número' onChange={(e) => setNewNumber(e.target.value)} />
                  <button onClick={handleNumberChange}><i class="fa-solid fa-rotate-right"></i></button>
                  {newNumber && cambioRealizado && <div className="EditarPerfil-CambioRealizadoConExito"><i class="fa-solid fa-check"></i></div>}
                </div>
                
                
                  
                

              </div>  


            </div>
            
            ) : (
                  
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
             
            )}

        </div>
    )
}