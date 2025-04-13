import StoreModule from '../module';

/**
 * Авторизация пользователя
 */
class Profile extends StoreModule {
    initState() {
        return {
            userProfile: {
                name: '',
                phone: '',
                email: '',
            },
            error: '',
            waiting: false,
        };
    }

    //Получение профиля пользователя
    async fetchProfile(token) {
        this.setState({
            ...this.getState(),
            waiting: true,
        })

        if (!token) {
            console.log('Вы не авторизованы!');
            this.setState({
                ...this.getState(),
                waiting: false,
            })
            return;
        }

        try {
            const response = await fetch('/api/v1/users/self?fields=email,profile(name,phone)', {
                headers: {
                    'X-Token': token,
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json();

            this.setState({
                ...this.getState(),
                userProfile: {
                    email: data.result.email,
                    name: data.result.profile.name,
                    phone: data.result.profile.phone,
                },
                waiting: false,
            }, 'Получены данные о пользователе')

        } catch (error) {
            console.log(error, 'Ошибка получения данных!')
            this.setState({
                ...this.getState(),
                waiting: false,
            })
        }
    }
}

export default Profile;