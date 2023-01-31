export default class AdminAccountService {

	_apiBase= 'http://localhost:3001';
	//_apiBase= 'https://admin-account.herokuapp.com/api';

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`, {
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
		});
		
		if (!res.ok) {
			throw new Error (
				`Couldn't fetch ${this._apiBase}${url}, received ${res.status}`); 
		}

		return res.json();
	}

	getNewsList = async () => {
		const res = await this.getResource(`/newsData`);
		return res;
	}

	getDataDirectories = async () => {
		const res = await this.getResource(`/directories`);
		return res;
	}

	getUsers = async () => {
		const res = await this.getResource(`/users`);
		return res;
	}

	postData = async (url, data) => {
		const res = await fetch(`${this._apiBase}${url}`, {
			mode: 'cors',
			//credentials: "include",
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				//'Content-type': 'application/json',
				//'Accept': 'application/json',
				//'Origin': '*'
			},
			body: data
		});
	
		return res.json();
	}

	postDataForm = async (json) => {
		// const formData = new FormData(form);
		// const json = JSON.stringify(Object.fromEntries(formData.entries(formData)));

		const res = await this.postData(`/requests`, json);
		return res;
	}

	postDataPersonal = async (data) => {
		const res = await this.postData(`/personalData`, data);
		return res;		
	}

	postPhotoPersonal = async (data) => {
		const res = await this.postData(`/personalPhoto`, data);
		return res;
	}

	postNewsImage = async (data) => {
		const res = await this.postData(`/newsImage`, data);
		return res;
	}

	postNewsData = async (data) => {
		const res = await this.postData(`/newsData`, data);
		return res;		
	}

	postUserData = async (data) => {
		const res = await fetch(`${this._apiBase}/users`, {
			mode: 'cors',
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-type': 'application/json'
			},
			body: data
		});
	
		return res.json();
	}

	putNewsData = async (id, data) => {
		const res = await fetch(`${this._apiBase}/newsData/${id}`, {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: data
		});
	
		return res.json();
	}

	putTitleDirectory = async (id, data) => {
		const res = await fetch(`${this._apiBase}/directories/${id}`, {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-type': 'application/json',
			},
			body: data
		});
	
		return res.json();
	}

	putUserData = async (id, data) => {
		const res = await fetch(`${this._apiBase}/users/${id}`, {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-type': 'application/json',
			},
			body: data
		});
		
		return res.json();
	}

	deleteNews = async (id) => {
		const res = await fetch(`${this._apiBase}/newsData/${id}`, {
			mode: 'cors',
			method: 'DELETE',
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
		});

		return res.json();
	}

	deleteUser = async (id) => {
		const res = await fetch(`${this._apiBase}/users/${id}`, {
			mode: 'cors',
			method: 'DELETE',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-type': 'application/json',
			}
		});

		return res.json();
	}

}