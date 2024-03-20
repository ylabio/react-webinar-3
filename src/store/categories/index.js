import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false
    }
  }

  async load() {
    this.setState({
      list: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      this.setState({
        list: json.result.items,
        waiting: false
      }, 'Загружен список категорий из АПИ');

    } catch (e) {
      this.setState({
        list: [],
        waiting: false
      });
    }
  }
}

export default CategoriesState;