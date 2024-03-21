import StoreModule from "../module";

/**
 * Categories
 */
class categoriesState extends StoreModule {
  initState() {
    return {
      waiting: false, // признак ожидания загрузки
      data:[],
    }
  }
  async load() {
    this.setState({
      ...this.getState(),
      waiting: true, // признак ожидания загрузки
    });
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        data:json.result.items,
        waiting: false, // признак ожидания загрузки
      }, 'Данные категорий загружены');
    } catch (e) {
      console.error(e.message)
    }
  }
}

export default categoriesState;
