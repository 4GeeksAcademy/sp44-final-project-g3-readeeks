const getState = ({ getStore, getActions, setStore }) => {
	
	
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/login`, opts)
					if(resp.status !== 200){
						alert("Email y/o contraseña errado");
						return false;
					} 

					const data = await resp.json();
					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true	
				}
				catch(error){
					console.error("There has been an error");
				}
				
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			  },

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			getUsers: () => {
				const rest = "/users";

				const fetchGetUsers = async () => {
					const url = process.env.BACKEND_URL + rest;
					const request = {
						method: "GET",
					};

				const response = await fetch(url, response);

				if (response.ok) {
					const data = await response.json();
					localStorage.setItem('users', JSON.stringify(data))
				} else {
					console.log("Error", response.status, response.statusText);
				}
				};
				fetchGetUsers();
			}
			// getUsersId: (id) => {
    
			// 	id = 1; // Cambiar por la variable del usuario logueado
				
			// 	const url = `${process.env.BACKEND_URL}/users/${id}`;
			
			// 	const fetchGetUsersId = async () => {
					
			// 		const request = {
			// 	 		method: "GET",
			// 		};
			
			// 		const response = await fetch(url, request);
			
			// 		if (response.ok) {
			// 	  		const data = await response.json();
			// 	  		localStorage.setItem('getUsersId', JSON.stringify(data))
			// 		} else {
			// 	  		console.log("Error", response.status, response.statusText);
			// 		}
			//   	};
			// 	fetchGetUsersId()
			// }
		}
	}
};

export default getState;
