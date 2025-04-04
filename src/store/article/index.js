import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      article: {},
    };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      'Загружен выбранный товар из АПИ',
    );
  }

}

export default Article;
