import StoreModule from "../module";

class UserProfileState extends StoreModule {
    initState() {
        return {
            user: null,
            profile: null,
            profileError: null,
        };
    }

    async fetchProfile() { 
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
                    user: json.result.profile.name,
                    token,
                    waiting: false,
                    profile: {
                        ...json.result.profile,
                        email: json.result.email
                    },
                });
            } catch (e) {
                console.error('Ошибка при загрузке профиля:', e);
            }
        }
    }

    // Дополнительные методы для работы с профилем пользователя могут быть добавлены здесь
}

export default UserProfileState;