import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalPages: 1
    };
  }

  async load(page = 1) {
    const limit = 10;
    const skip = (page - 1) * limit;
    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      const list = json.result.items;
      const totalPages = Math.ceil(json.result.count / limit);

      this.setState({
        ...this.getState(),
        list,
        currentPage: page,
        totalPages
      }, 'Загружены товары из АПИ');
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);      
    }
  }

  async fetchProductById(productId) {
    const fields = 'title,description,price,madeIn(title,code),category(title),edition';
    try {
      const response = await fetch(`/api/v1/articles/${productId}?fields=${fields}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error('Ошибка загрузки данных текущего продукта:', error);      
      return null; 
    }
  }

}

export default Catalog;
