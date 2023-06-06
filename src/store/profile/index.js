import StoreModule from "../module";

class ProfileState extends StoreModule {

	initState() {
		return {
			data: {},
			waiting: false // признак ожидания загрузки
		}
	}

	/**
	 * @param id {String}
	 * @return {Promise<void>}
	 */
	async loadProfile() {

		this.setState({
			profile: {},
			waiting: true
		});

		try {
			const token = window.localStorage.getItem("token");
			if (token) {
				const response = await fetch(`/api/v1/users/self`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"X-Token": token,
					},
				});
				const json = await response.json();
				this.setState({
					...this.getState(),
					profile: json.result,
					waiting: false
				}, 'Загружены данные профиля');
			}
		} catch (e) {
			this.setState({
				profile: {},
				waiting: false
			});
		}
	}
}

export default ProfileState;