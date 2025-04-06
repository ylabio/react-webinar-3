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
      count: 0,
      curPage: 1,
      limit: 10
    };
  }

  async load(limit=10, skip=0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }

  async setCount() {
    const response = await fetch('/api/v1/articles?fields=items(),count')
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        count: json.result.count,
      },
      'Загружено колличество товаров из АПИ',
    );
  }

  getCount() {
    return this.getState().count;
  }

  setCurPage(page) {
    this.setState({
      ...this.getState(),
      curPage: page
    }, 'Изменена текущая страница',)
  }

  getCurPage() {
    console.log(this.getState().curPage);
    
    return this.getState().curPage;
  }

  getLimit() {
    return this.getState().limit;
  }

  setLimit(limit) {
    this.setState({
      ...this.getState(),
      limit: limit
    }, 'Изменен лимит',)
  }
}

export default Catalog;
