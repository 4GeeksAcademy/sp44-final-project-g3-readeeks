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
					localStorage.setItem("user_id", data.user_id);

					setStore({ 
						token: data.access_token
					});
					return true;	
				}
				catch(error){
					console.error("There has been an error");
				}
			},

			// login: async (email, password) => {
			// 	const opts = {
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-Type': 'application/json'
			// 		  },
			// 		body: JSON.stringify({
			// 			"email": email,
			// 			"password": password
			// 		})
			// 	};
				
			// 	try {
			// 		const resp = await fetch(`${process.env.BACKEND_URL}/login`, opts);
			// 		const data = await resp.json();
			
			// 		if (resp.ok) {
			// 			localStorage.setItem("token", data.access_token);
			// 			localStorage.setItem("user_id", data.user_id); // Save the user ID here
			// 			setStore()
			// 		}
			
			// 		return data; // Return the complete response
			// 	} catch (error) {
			// 		console.error("There has been an error", error);
			// 		return null;
			// 	}
			// },
			
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			  },

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/hello")
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
						headers: {
							"Content-Type": "application/json"
						},
						method: "GET",
					};

				const response = await fetch(url, request);

				if (response.ok) {
					const data = await response.json();
					localStorage.setItem('users', JSON.stringify(data))
				} else {
					console.log("Error", response.status, response.statusText);
				}
				};
				fetchGetUsers();
			},

			getUserId: async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("Token not found in local storage");
            return null; // Return null or handle the absence of a token as needed
          }

          const opts = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const resp = await fetch(`${process.env.BACKEND_URL}/get-user-id`, opts);

          if (resp.status !== 200) {
            console.error("Error fetching user ID", resp.status, resp.statusText);
            return null; // Handle the error condition as needed
          }

          const data = await resp.json();
          return data.user_id;
        } catch (error) {
          console.error("Error fetching user ID", error);
          return null; // Handle the error condition as needed
        }
      },
		}
	};
};

export default getState;
