import { removeEmptyFields } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние аутентификации
 */
class AuthStore extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            profileName: "",
            isAuthenticated: false,
            error: null,
            loginErrors : [],
            waiting: false
        }
    }

    async authentication(user) {
        user = removeEmptyFields(user)
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
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem("token", json.result.token,);
                localStorage.setItem("profileName", json.result.user.profile.name);
                this.setState({
                    ...this.getState(),
                    profileName : json.result.user.profile.name,
                    isAuthenticated : true,
                    waiting : false,
                }, 'Пользователь аутефицировался');
                
            } else {
                console.log(json)
                this.setState({
                    ...this.getState(),
                    waiting: false,
                    loginErrors: json.error.data.issues.map(el => el.message)
                }, 'Ошибка аутентификации');
            }
        }catch(error){
            this.setState({
                ...this.getState(),
                waiting: false,
                error: error.message,
            }, 'Ошибка отправки запросы');
        }   
    }

    sessionRecovery(){
        this.setState({
            ...this.getState(),
            profileName: localStorage.getItem("profileName"),
            isAuthenticated: true,
        }, 'Восстановление сессии');
    }

    async logout() {
        this.setState({
            ...this.getState(),
            waiting: true,
            error: ""
        }, 'Идет запрос на Выход')

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
                localStorage.removeItem("profileName")
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
        console.log(this.getState().store)
        if (token) {
            this.getState().actions.profile.authorization();
        }
    }

    clearLoginErrors(){
        this.setState({
            ...this.getState(),
            loginErrors : []
        }, 'Очистили ошибки логина')
    }
}

export default AuthStore;
