import StoreModule from "../module";

class UserProfileState extends StoreModule {
    initState() {
        return {
            profile: null,
            profileError: null,
            waiting: false,
        };
    }

    async fetchProfile() {
        this.setState({ waiting: true });

        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await fetch('/api/v1/users/self?fields=*', {
                    headers: {
                        'X-Token': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка получения данных профиля');
                }

                const json = await response.json();
                this.setState({
                    waiting: false,
                    profile: {
                        ...json.result.profile,
                        email: json.result.email
                    },
                });
            } catch (e) {
                console.error('Ошибка при загрузке профиля:', e);
                this.setState({
                    waiting: false,
                    profileError: e.message,
                });
            }
        } else {
            
            this.setState({ waiting: false });
        }
    }

    
}

export default UserProfileState;