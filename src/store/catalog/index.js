import { calculateTotalPagesAmount, codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      totalPages: 0
    }
  }

  async load(page, language) {
    const articlesUrl = `/api/v1/articles?limit=10&skip=${(page - 1) * 10}&lang=${language}`
    const response = await fetch(articlesUrl);
    const totalItemsAmountResponse = await fetch('/api/v1/articles?fields=items(_id, title, price),count')

    const json = await response.json();
    const totalItemsAmount = await totalItemsAmountResponse.json();
    const totalPages = calculateTotalPagesAmount(totalItemsAmount.result.count)

    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalPages: totalPages,
    }, 'Загружены товары из АПИ');
  }
  async loadProductContent(id, language) {
    const productUrl = `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)&lang=${language}`
    const response = await fetch(productUrl);

    const json =  await response.json();

    return { ...json.result, };
  }
}

export default Catalog;
