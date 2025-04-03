import { codeGenerator, generatePagesArray } from '../../utils';
import { DEFAULT_QUERY } from '../../query/constants';

import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pagesCountList: [],
      defaultViewItems: 10,
      itemsCount: 0,
      currentPage: 0
    };
  }

  async load(lang = 'ru') {
    const {defaultViewItems, currentPage} = this.getState();
    const skip = defaultViewItems * currentPage
    const response = await fetch(
      `${DEFAULT_QUERY}?limit=${defaultViewItems}&lang=${lang}&skip=${skip}&fields=items(_id, title,price),count`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        pagesCountList: generatePagesArray(json.result.count),
        itemsCount: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async updateProductData(limit = 10, page = 0, lang = 'ru') {
    let skipCount = 0;
    if (page > skipCount) {
      skipCount = limit * page;
    }

    const response = await fetch(`${DEFAULT_QUERY}?limit=${limit}&skip=${skipCount}&lang=${lang}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        pagesCountList: generatePagesArray(this.getState().itemsCount, limit),
        defaultViewItems: limit,
        currentPage: page,
      },
      'Обновлены товары из АПИ',
    );
  }
}

export default Catalog;
