import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      id: '',
      title: '',
      description: '',
      price: 0,
      country: '',
      year: 2000,
      category: '',
    };
  }

  // Загрузка продукта по id (берется из useEffect на странице продукта)
  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=_id,title,price,description,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        price: json.result.price,
        country: json.result.madeIn.title,
        year: json.result.edition,
        category: json.result.category.title,
      },
      'Загружен товар из АПИ',
    );
  }
}

export default Product;