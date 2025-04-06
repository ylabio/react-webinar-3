import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Article extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      item: {},
    };
  }

  async load(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=description,edition,price,title,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
      },
      'Загружен товар по ID из АПИ',
    );
  }

}

export default Article;
