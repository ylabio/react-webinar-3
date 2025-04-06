import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Pagination extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      count: 0,
      maxPages: 0,
      curPage: 1,
      showItem: 10,
    };
  }
  setCurPage(page) {
    this.setState(
      {
        ...this.getState(),
        curPage: page,
      },
      'значение страницы',
    );

    
  }

  setShowItem(count) {
    this.setState(
      {
        ...this.getState(),
        showItem: count,
      },
      'кол элементов на странице',
    );
  }

  async setMaxPages(limit = 10) {
    const response = await fetch(`/api/v1/articles?fields=items(),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        count: json.result.count,
        maxPages: Math.ceil(json.result.count / limit),
      },
      'установлено максимальное значение страниц',
    );
  }
}

export default Pagination;
