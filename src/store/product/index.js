import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      aboutProduct: {},
    };
  }
//http://query.rest/api/v1/articles/${_id}?fields=description,madeIn(title,code),category(title),edition,price
  async loadAbout(_id = 404) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=title,description,madeIn(title,code),category(title),edition,price`);
    const json = await response.json();
    console.log(json);
    this.setState(
      {
        ...this.getState(),
        aboutProduct: json.result,
      },
      'подробнее о товаре из АПИ',
    );
  }
}

export default Product;
