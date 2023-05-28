import StoreModule from "../module";
import {getProductData} from "../../api";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      isLoading: false,
    }
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true
      });

      let sum = 0;
      // Ищем товар в корзине, чтобы увеличить его количество
      let exist = false;
      const list = this.getState().list.map(item => {
        let result = item;
        if (item._id === _id) {
          exist = true; // Запомним, что был найден в корзине
          result = {...item, amount: item.amount + 1};
        }
        sum += result.price * result.amount;
        return result;
      });

      if (!exist) {
        // Поиск товара в каталоге, чтобы его добавить в корзину.
        // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
        // const item = this.store.getState().catalog.list.find(item => item._id === _id);

        //Здесь делаем запрос на поиск товара в АПИ
        const item = await getProductData(_id);

        list.push({...item, amount: 1}); // list уже новый, в него можно пушить.
        // Добавляем к сумме.
        sum += item.price;
      }

      this.setState({
        ...this.getState(),
        list,
        sum,
        amount: list.length
      }, 'Добавление в корзину');
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({
        ...this.getState(),
        isLoading: false
      });
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

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
