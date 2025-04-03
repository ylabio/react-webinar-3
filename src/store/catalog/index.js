import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      selectedItem: null,
      currentPage: 1,
      totalItemsCount: 0,
      pageSize: 10,
    };
  }

  async getItemsCount() {
    const response = await fetch(`/api/v1/articles?fields=items(),count`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        totalItemsCount: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async getItems(params = {}) {
    const {
      currentPage = this.store.getState().catalog.currentPage,
      pageSize = this.store.getState().catalog.pageSize,
    } = params;
    const lang = this.store.getState().language.currentLanguage;
    const skip = (currentPage - 1) * pageSize;
    const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${skip}&lang=${lang}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        currentPage,
      },
      'Загружены товары из АПИ с пагинацией',
    );
  }

  async getItemInfoById(
    itemId,
    fields = 'title,description,price,edition,madeIn(title,code),category(title)',
  ) {
    const lang = this.store.getState().language.currentLanguage;
    const response = await fetch(`/api/v1/articles/${itemId}?fields=${fields}&lang=${lang}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        selectedItem: json.result || null,
      },
      `Загружен товар с ID: ${itemId}`,
    );
  }

  changePageSize(pageSize) {
    this.setState(
      {
        ...this.getState(),
        pageSize: pageSize,
      },
      'Обновлен pageSize',
    );
  }

  selectItem(item) {
    this.setState(
      {
        ...this.getState(),
        selectedItem: item,
      },
      'Обновлен SelectedItem',
    );
  }
}

export default Catalog;
