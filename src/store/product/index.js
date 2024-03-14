import { getProductById } from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      item: {},
      error: 'none',
    }
  }

  /**
   * Добавление товара в корзину
   * @param productId айдишник товара в запросе
   * @param fields поля запроса, строка должна начинаться 'fields=', по умолчанию - 'fields=title,description,madeIn(title,code),category(title),edition,price'
   */
  // fields=title,description,madeIn(title,code),category(title),edition,price
  async load(productId, fields) {
    const response = await getProductById(productId, fields)
    if(response.result) this.setState({
      ...this.getState(),
      item: response.result,
      error: 'none',
    }, 'Загружен товар из АПИ');
    else { this.setState({...this.getState(), error: response.error}) }
  }
}

export default Product;