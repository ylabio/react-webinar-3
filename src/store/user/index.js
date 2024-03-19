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
      result: {},
      
    }
    
  }
  
   handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/sign', {
        login: login,
        password: password
      });
      setUser(response.data.user);
      console.log('User signed in successfully');
    } catch (error) {
      setError(error.response.data.message); // Предполагается, что сервер возвращает сообщение об ошибке в поле "message"
    }
  };
}
export default User;
