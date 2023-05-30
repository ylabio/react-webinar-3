import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalPages: 1,
      currPage: 1,
      onPage: 10,
      article: {},
    };
  }

  setCurrPage(page) {
    this.setState({
      ...this.getState(),
      currPage: page,
    });
  }

  async load() {
    const response = await fetch("/api/v1/articles");
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      "Загружены товары из АПИ"
    );
  }

  async loadArticles() {
    const onPage = this.getState().onPage;
    const currPage = this.getState().currPage;
    const response = await fetch(
      `/api/v1/articles?limit=${onPage}&skip=${
        (currPage - 1) * onPage
      }&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / onPage),
      },
      "Загружены товары из АПИ по конкретной странице"
    );
  }

  async loadArticle(id) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      "Загружена подробная информация о товаре"
    );
  }
}

export default Catalog;
