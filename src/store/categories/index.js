import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      data: [],
      waiting: false
    }
  }

  async getCategories() {
    this.setState({
      data: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      this.setState({
        data: json.result.items,
        waiting: false
      }, 'Загружен список категорий из АПИ');

    } catch (e) {
      this.setState({
        data: [],
        waiting: false
      });
    }
  }
}

export default CategoriesState;