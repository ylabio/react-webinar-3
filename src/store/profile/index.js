import StoreModule from "../module";

/**
 * Состояние профиля - Данные пользователя
 */
class ProfileStore extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        this.checkToken()
        return {
            profile: {
            },
            isAuthenticated: localStorage.getItem("token") ? true : false,
            isAuthorized : false,
            error: null,
            waiting: false
        }
    }

    async authentication(user) {
        this.setState({
            ...this.getState(),
            waiting: true,
            error: ""
        }, 'Идет запрос на Аутентификацию');

        try{
            const response = await fetch('/api/v1/users/sign?fields=_id%2Cprofile%28name%29', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                const json = await response.json();
                localStorage.setItem("token", json.result.token,);
                this.setState({
                    ...this.getState(),
                    isAuthenticated : true,
                    waiting : false,
                }, 'Пользователь аутефицировался');
                
            } else {
                console.log("Ошибка")
                throw new Error('Ошибка запроса');
            }
        }catch{
            this.setState({
                ...this.getState(),
                waiting: false,
                error: "Ошибка попробуйте снова",
            }, 'Ошибка аутентификации');
        }   
    }

    async authorization() {
        this.setState({
            ...this.getState(),
            waiting: true,
            isAuthenticated : false,
            error: ""
        }, 'Идет запрос на Авторизацию');

        try{
            const token = localStorage.getItem('token');
            const response = await fetch('/api/v1/users/self?fields=*', {
                headers: {
                    'X-Token': token,
                }
            })
            if (response.ok) {
                const json = await response.json();
                this.setState({
                    ...this.getState(),
                    isAuthorized:true,
                    isAuthenticated : true,
                    waiting: false,
                    profile:{
                        name:json.result.username,
                        phone: json.result.profile.phone,
                        email: json.result.email,
                    },
                }, 'Пользователь авторизировался');
                
            } else {
                throw new Error('Ошибка запроса');
            }
        }catch(error){
            this.setState({
                ...this.getState(),
                waiting: false,
                error: error.message,
            }, 'Ошибка авторизации');
        }   
    }

    async logout() {
        this.setState({
            ...this.getState(),
            waiting: true,
            error: ""
        }, 'Идет запрос на Выход');

        try{
            const token = localStorage.getItem('token');
            const response = await fetch('/api/v1/users/sign', {
                method: "DELETE",
                headers: {
                    'X-Token': token,
                },
            })
            if (response.ok) {
                localStorage.removeItem("token")
                this.setState({
                    ...this.initState(),
                }, 'Пользователь вышел');
                

            } else {
                throw new Error('Ошибка запроса');
            }
        }catch{
            this.setState({
                ...this.getState(),
                waiting: false,
                error: "Ошибка попробуйте снова",
            }, 'Ошибка выхода');
        }   
            
        
    }

    checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.authorization();
        }
    }
}

export default ProfileStore;
