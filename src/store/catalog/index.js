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
      page: { total: 0, current: 1, limit: 10 },
      loading: false
    }
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async loadPage(pageNumber) {
    pageNumber ??= 1;

    // это можно не делать, но если закликивать пагинатор, там дичь начинается
    this.setState({
      ...this.getState(),
      loading: true
    }, 'Загрузка...');

    const limit = this.getState().page.limit;
    // http://example.front.ylab.io/api/v1/articles?limit=10&skip=20
    //const response = await fetch(`/api/v1/articles?limit=${max}&skip=${(pageNumber - 1) * max},count`);
    //const response = await fetch(`/api/v1/articles?limit=${max}&skip=${(pageNumber - 1) * max}&fields=*,count`); // дьявол
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${(pageNumber - 1) * limit}&fields=items(*),count`);
    const json = await response.json();
    // todo: ловить ошибки?
    this.setState({
      list: json.result.items,
      page: {
        ...this.getState().page,
        total: Math.ceil(json.result.count / this.getState().page.limit),
        current: pageNumber
      },
      loading: false
    }, 'Загружено ' + limit + ' товаров для ' + pageNumber + 'й страницы');
  }

  setCurrentPage(current) {
    const page = this.getState().page;
    if (current < 1)
      current = 1;
    if (current > page.total)
      current = page.total;
    this.setState({
      ...this.getState(),
      page: {
        ...page,
        current
      }
    }, 'Текущая страница: ' + current);
  }

  // для тестов пусть будет
  setLimit(limit) {
    const page = this.getState().page;
    this.setState({
      ...this.getState(),
      page: {
        ...page,
        limit
      }
    }, 'Число товаров на странице: ' + limit);
    // todo: загрузиться с 1й страницы, или писать костыль чтоб текущие товары не слетели
  }

}

export default Catalog;
