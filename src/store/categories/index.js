import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      items: [],
    };
  }
  async load() {
    const response = await fetch(
      "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        items: json.result.items,
      },
      "Загружен список товаров из АПИ"
    );
  }
}

export default CategoriesState;
