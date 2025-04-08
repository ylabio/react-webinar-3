import StoreModule from '../module';
import { BASE_URL } from '../../const';
import { getApiData, generateProductApiUrl } from '../../utils';

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    let sum = 0;
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true;
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });
  
    if (!exist) {
      const fetchProductData = async () => {
        try {
          const data = await getApiData(generateProductApiUrl(BASE_URL, _id));
          const result = data.result;
          
          // Создаём НОВУЮ копию списка с добавленным товаром
          const updatedList = [...list, { 
            _id: result._id, 
            price: result.price, 
            title: result.title, 
            amount: 1 
          }];
          
          // Пересчитываем сумму с новым товаром
          const updatedSum = sum + result.price;
          
          this.setState({
            ...this.getState(),
            list: updatedList,
            sum: updatedSum,
            amount: updatedList.length,
          }, 'Добавление в корзину (асинхронное)');
        } catch (err) {
          console.error("Error fetching product data:", err);
        }
      };
      fetchProductData();
    } else {
      // Синхронный случай (товар уже в корзине)
      this.setState({
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      }, 'Добавление в корзину (синхронное)');
    }
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

export default Basket;
