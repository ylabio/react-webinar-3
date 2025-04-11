import StoreModule from '../module';

/**
 * Авторизация пользователя
 */
class Auth extends StoreModule {
    initState() {
        return {
            login: '',
            password: '',
            userProfile: {
                name: '',
                phone: '',
                email: '',
            },
            waiting: false, // признак ожидания загрузки
        };
    }

    setLogin(value) {
        this.setState({
            ...this.getState(),
            login: value,
        })
    }

    setPassword(value) {
        this.setState({
            ...this.getState(),
            password: value,
        })
    }

    async authorizate(token) {
        this.setState({ ...this.getState(), waiting: true }); // Начинаем ожидание

        if (token) {
            try {
                const response = await fetch('/api/v1/users/self?fields=profile(name)', {
                    headers: {
                        'X-Token': token,
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();

                this.setState({
                    ...this.getState(),
                    waiting: false,
                    userProfile: {
                        ...this.getState().userProfile,
                        name: data.result.profile.name,
                    }
                }, 'Пользователь авторизован');

            } catch (error) {
                console.error('Ошибка авторизации, токен устарел')
            }
        }

        const authData = JSON.stringify({
            login: this.getState().login,
            password: this.getState().password,
        })

        try {
            const response = await fetch('/api/v1/users/sign?fields=email,profile(name, phone)', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: authData,
            });

            const data = await response.json();

            this.setState({
                ...this.getState(),
                waiting: false,
                userProfile: {
                    ...this.getState().userProfile,
                    name: data.result.user.profile.name,
                }
            }, 'Пользователь авторизован');

            localStorage.setItem('authToken', data.result.token);
            return true;

        } catch (error) {
            console.error('Ошибка при авторизации!', error);

            this.setState({
                ...this.getState(),
                waiting: false,
            })
            return false;
        }
    }

    //Получение профиля пользователя
    async fetchProfile() {
        this.setState({
            ...this.getState(),
            waiting: true,
        })

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
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
                    'X-Token': authToken,
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

    // Выход - отмена авториазции для удаления токена
    async logOut() {
        this.setState({
            ...this.getState(),
            waiting: true,
        }, 'Выход из аккаунта')
        const authToken = localStorage.getItem('authToken');

        try {
            const response = await fetch('/api/v1/users/sign', {
                method: 'DELETE',
                headers: {
                    'X-Token': authToken,
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json();
            if (data.result) {
                localStorage.removeItem('authToken');
                this.setState({
                    ...this.getState(),
                    userProfile: {
                        name: '',
                        phone: '',
                        email: '',
                    },
                    waiting: false,
                }, 'Пользователь вышел из аккаунта')
            } else {
                console.log('Ошибка, токен недействителен');
                this.setState({
                    ...this.getState(),
                    waiting: false,
                })
            }

        } catch (error) {
            console.log('Ошибка сервера!')
        }
    }
}

export default Auth;