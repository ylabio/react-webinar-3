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
    };
  }

  async load(lang = 'ru') {
    const response = await fetch(
      `${DEFAULT_QUERY}?limit=10&lang=${lang}&skip=0&fields=items(*),count`,
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
      },
      'Обновлены товары из АПИ',
    );
  }
}

export default Catalog;
