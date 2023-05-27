import StoreModule from "../module";

class CatalogItem extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      catalogItem: {},
      category: {},
      madeIn: {},
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       catalogItem: json.result,
       category: json.result.category,
       madeIn: json.result.madeIn,
    }, 'Загружен выбранный товар из АПИ');
  }
}

export default CatalogItem;
