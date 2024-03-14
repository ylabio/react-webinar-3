import { calculateTotalPagesAmount, codeGenerator, getTotalPages } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    const list = {}
    setTimeout(() => {
      for (let lang of Object.keys(this.store.state.language.languages)) {
        list[lang] = []
      }
    })

    return {
      list: list,
      totalPages: 0
    }
  }

  async load(page) {
    const newList = {}
    for (let lang of Object.keys(this.store.state.language.languages)) {
      newList[lang] = []
    }

    for ( let listLang of Object.keys(newList)) {
      const articlesUrl = `/api/v1/articles?limit=10&skip=${(page - 1) * 10}&lang=${listLang}`;
      const response = await fetch(articlesUrl);
      const json = await response.json();

      newList[listLang] = json.result.items
    }

    const totalPages = await getTotalPages()

    this.setState({
      ...this.getState(),
      list: newList,
      totalPages: totalPages,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
