import StoreModule from "../module";
import axios from "axios";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class User extends StoreModule {

   
  /**
   * Начальное состояние
   * @return {Object}
   */
 initState() {
  return {
    result:  {},
    
  }
}
  
   handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/v1/users/sign', {
        login: login,
        password: password
      });
      console.log(response);
      setUser(response.data.result.user);
      console.log('User signed in successfully');
    } catch (error) {
      const er = error.response.data.error;
      let msg = er.message;
      if ('data' in er) {
        const {data} = er;
        if ('issues' in data) {
          const {issues} = data;
          msg += ': ' + issues.map(x => x.message).join(', ');
        }
      }
      setError(msg); // Предполагается, что сервер возвращает сообщение об ошибке в поле "message"
    }
  };
}
export default User;
