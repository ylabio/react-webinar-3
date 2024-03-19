import StoreModule from "../module";

/**
 * Состояние профиля
 */
class ProfileStore extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            profile: {
                name:"",
                phone:"",
                email: ""
            },
            isAuthorized : false,
            waiting: false,
        }
    }

    async authorization() {
        this.setState({
            ...this.getState(),
            waiting: true,
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
                console.log(this.getState())
                this.setState({
                    ...this.getState(),
                    waiting: false,
                    isAuthorized : true,
                    profile:{
                        name: json.result.profile.name,
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
    

}

export default ProfileStore;
