import StoreModule from '../module';

class Product extends StoreModule {

  initState() {
    return {
      product: {}
    }
  }

  /**
   * Получение данных о продукте
   * @param _id Код товара
   */
  async load(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       product: json.result
    }, 'Загружен продукт из АПИ');
  }


  /**
   * Oчищение данных о продукте для актуальности 
   */
  clear() {
    this.getState().product = {}
  }
}

export default Product;
