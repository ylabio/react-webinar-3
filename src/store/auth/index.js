import StoreModule from "../module";
class AuthState extends StoreModule {
    initState() {
        return {
            user: null,        
            token: null,      
            loginError: null, 
            waiting: false ,
            profile:null ,
        };
    }

    /**
     * Авторизация пользователя
     * @param username {String}
     * @param password {String}
     * @return {Promise<void>}
     */
    async login(login, password) {
        this.setState({ waiting: true, loginError: null });

        try {
            const response = await fetch('/api/v1/users/sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });

            if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }

            const json = await response.json();
            console.log('json',json);
            this.setState({
                token: json.result.token,
                user: json.result.user.username,
                waiting: false
            });
            
            localStorage.setItem('authToken', json.result.token);
        } catch (e) {
            this.setState({
                waiting: false,
                loginError: e.message
            });
            throw e; 
        }
    }



 
    async logout() {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {

                const response = await fetch('/api/v1/users/sign', {
                    method: 'DELETE',
                    headers: {
                        'X-Token': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка разлогинивания');
                }
                this.setState({ user: null, token: null });
                localStorage.removeItem('authToken');
            } catch (e) {
                console.error('Ошибка при разлогинивании:', e);
            }
        }
    }
    async fetchProfile() { //по сути получился двойной запрос, но я пока не знаю как проверять на валидность токена кроме как через это, не хранить пароли
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
                    user: json.result.username,
                    token,
                    waiting: false,
                    profile: {
                        ...json.result.profile,
                        email: json.result.email
                    },
                });
               
                console.log('1231231231',user,'13212313');
            } catch (e) {
                console.error('Ошибка при загрузке профиля:', e);
            }
        }
    }


    
    async autoLogin() { //Так как а апи нет ссылки для авторизации по логину, я сделал авторизацю через получение данных, это позволяет сразу проверить ликвидность токена и его удаление если он неправильный или вышел из строя, поидее тут должен быть другой запрос
        const token = localStorage.getItem('authToken');
        if (!token) {
            return;
        }

        this.setState({ waiting: true });

        try {
            const response = await fetch('/api/v1/users/self?fields=*', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': token  
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка автоматической авторизации');
            }

            const json = await response.json();
            console.log('json', json);
            this.setState({
                user: json.result.username,
                token,
                waiting: false,
                profile: {
                    ...json.result.profile,
                    email: json.result.email
                },
            });
        } catch {
            this.setState({ waiting: false });
            localStorage.removeItem('authToken');
        }
    }
}

export default AuthState;