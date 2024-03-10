import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
<<<<<<< HEAD
      list: [],
      item: null,
      totalPages: 1,

    }
  }

  async load({ page = 1 } = {}) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(page - 1) * 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / 10)
      },
      "Загружены товары из АПИ"
    );
  }

  async loadOne(_id) {
    this.setState({...this.getState(), item: null})
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружен товар из АПИ');
=======
      list: []
    }
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
  }
}

export default Catalog;
