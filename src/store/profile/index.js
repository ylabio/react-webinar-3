import StoreModule from '../module';

class User extends StoreModule {
	initState() {
		return {
			user: null,
			error: null,
		};
	}

	async signIn(data) {
	
			const response = await fetch('api/v1/users/sign', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const resultUser = await response.json();

			if (response.ok) {
				localStorage.setItem('token', resultUser.result.token);
				this.setState({
					...this.getState(),
					user: resultUser.result.user,
				});
			} else {
				this.setState({
					...this.getState(),
					error: resultUser.error.data.issues[0].message,
				});
			}
	}

	async singOut() {
		try {
			const response = await fetch('api/v1/users/sign', {
				method: 'DELETE',
				headers: {
					'X-Token': localStorage.getItem('token'),
					'Content-type': 'application/json',
				},
			});
			const data = await response.json();

			localStorage.removeItem('token');

			this.setState({
				...this.getState(),
				user: null,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async getUser() {
		if (!localStorage.getItem('token')) return;
		try {
			const response = await fetch('api/v1/users/self', {
				method: 'GET',
				headers: {
					'X-Token': localStorage.getItem('token'),
					'Content-type': 'application/json',
				},
			});
			const resultUser = await response.json();
			this.setState({
				...this.getState(),
				user: resultUser.result,
			});
		} catch (error) {
			console.error(error);
		}
	}
}

export default User;
