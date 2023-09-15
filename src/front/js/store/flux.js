const getState = ({ getStore, getActions, setStore }) => {
	
	const host = "https://probable-couscous-7gpq6vx59w6c7jq-3001.app.github.dev/api";
	
	return {
		store: {
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
					const url = host + rest;
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
				
			// 	const url = `${host}/users/${id}`;
			
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
	};
};

export default getState;
