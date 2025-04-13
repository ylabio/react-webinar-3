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
            },
            error: '',
            waiting: false,
            isLoggedIn: false,
            authToken: null,
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

    //Авторизация по логину и паролю
    async authorizate() {
        this.setState({ ...this.getState(), error: '', waiting: true }); // Начинаем ожидание

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

            if (data.error) {
                const error = data.error.data.issues[0].message;

                this.setState({
                    ...this.getState(),
                    error,
                    waiting: false,
                })

                return false;
            }

            this.setState({
                ...this.getState(),
                waiting: false,
                userProfile: {
                    ...this.getState().userProfile,
                    name: data.result.user.profile.name,
                },
                isLoggedIn: true,
                authToken: data.result.token,
                login: '',
                password: '',
            }, 'Пользователь авторизован');

            localStorage.setItem('authToken', data.result.token);

            return true;

        } catch (error) {
            console.error('Ошибка при авторизации!', error);
            console.log(error);

            this.setState({
                ...this.getState(),
                errors: '',
                waiting: false,
            })
            return false;
        }
    }

    //Автоматическая авторизация по токену
    async checkAuth() {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            console.log('Пользователь не авторизован: отсутствует токен.');
            return false;
        }

        try {
            const response = await fetch('/api/v1/users/self?fields=profile(name)', {
                headers: {
                    'X-Token': authToken,
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
                },
                isLoggedIn: true,
                authToken: authToken,
            }, 'Пользователь авторизован по токену');

            return true;

        } catch (error) {
            console.error('Ошибка авторизации, токен устарел');
            this.setState({
                ...this.getState(),
                waiting: false,
                isLoggedIn: false,
                authToken: null,
            })
            return false;
        }
    }

    // Метод для получения статуса авторизации
    getIsLoggedIn() {
        return this.getState().isLoggedIn;
    }

    // Метод для получения токена
    getAuthToken() {
        return this.getState().authToken;
    }

    // Выход - отмена авториазции для удаления токена
    async logOut() {
        this.setState({
            ...this.getState(),
            waiting: true,
        }, 'Выход из аккаунта')

        const authToken = this.getState().authToken;

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
                    isLoggedIn: false,
                    authToken: null,
                    waiting: false,
                }, 'Пользователь вышел из аккаунта')
            } else {
                console.log('Ошибка, токен недействителен');
                this.setState({
                    ...this.getState(),
                    waiting: false,
                    isLoggedIn: false,
                    authToken: null,
                })
            }

        } catch (error) {
            console.log('Ошибка сервера!')
        }
    }

    // Очистка формы
    clearForm() {
        this.setState({
            ...this.getState(),
            login: '',
            password: '',
            error: '',
        })
    }
}

export default Auth;