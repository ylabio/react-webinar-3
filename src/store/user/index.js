import StoreModule from "../module";

class UserState extends StoreModule {

   initState() {
     return {
       isLogin: false,
       waiting: false,
       isInitialize: true,
       username: null
     };
   }
 
   async signIn(login, password){
      try {
         const authRequest = {
            login: login,
            password: password
         }
         this.setState({
            ...this.getState(),
            waiting: true,
            signInError: null
         }, `Авторизация`);

         const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(authRequest)
         });
         const json = await response.json();

         if (!response.ok){
            throw new Error(json?.error?.data?.issues[0]?.message);
         };

         this.setState({
            ...this.getState(),
            userData: json.result.user,
            token: json.result.token,
            waiting: false,
         }, `Получение данных пользователя`);
      } catch (error) {
         this.setState({
            ...this.getState(),
            signInError: error.message,
            waiting: false,
         }, `Ошибка`);
      }  
   }

   setToken(token) {
      this.setState({
         ...this.getState(),
         token: token
      }, `Присваивание токена пользователю`);
   }

   async getUserData(token) {
      try {
         this.setState({
            ...this.getState(),
            waiting: true,
            error: null
         }, `Получение данных пользователя`);

         const response = await fetch('/api/v1/users/self', {
            headers: {
               'Content-Type': 'application/json',
               'X-Token': token
            } 
         })

         const json = await response.json() 
         this.setState({
            ...this.getState(),
            userData: json.result,
            waiting: false,
         }, `Запись данных пользователя`);
      } catch (error) {
         this.setState({
            ...this.getState(),
            error: error,
            waiting: false,
         }, `Ошибка`);
      }
   }

   async logOut(token){
      try {
         this.setState({
            ...this.getState(),
            waiting: true,
            error: null
         }, `Выход из профиля`);

         await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
               'X-Token': token
            }  
         })

         this.setState({
            ...this.getState(),
            userData: null,
            token: null,
            waiting: false,
         }, `Смена состояния пользователя`);
      } catch (error) {
         this.setState({
            ...this.getState(),
            error: error,
            waiting: false,
         }, `Ошибка`);
      }
   }
 
   async self() {
      try {
       const temp = localStorage.getItem('user_secret');
       const token = temp && JSON.parse(temp);
       const response = await fetch(`/api/v1/users/self`, {
         headers: {
           'X-Token': token,
           'Content-Type': 'application/json'
         },
       });

       const json = await response.json();
       if (json.result.error) {
         this.setState({
           ...this.getState(),
           isInitialize: false
         });
       }
       if (!json.result.error) {
         this.setState({
           ...this.getState(),
           isLogin: true,
           username: json.result.username,
           isInitialize: false
         });
       }
     } catch (e) {
       this.setState({
         ...this.getState(),
         waiting: false
       });
     }
   }

   userStateClose() {
      this.setState({
         ...this.initState(),
      }, `Завершение сеанса пользователя`);
   }

   clearError() {
      this.setState({
         ...this.getState(),
         signInError: ''
      }, 'Ошибка сервера устранена')
   }
 }
 
 export default UserState;