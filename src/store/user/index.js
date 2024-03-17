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
  
  handleLogin = async () => {
    try {
      const response = await axios.post('/api/v1/users/sign', {
        login: 'test_1',
        password: '123456'
      });
      this.setState({ result: response.data }); // Обновление состояния с данными от сервера
    } catch (error) {
      console.error(error); // Обработка ошибок
    }
  };
}
export default User;
