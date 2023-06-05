import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [{value: '', title: `Все`}],
      waiting: false,
    }
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загрузка категорий');

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      const categories = [{value: '', title: `Все`}, ...json.result.items];

      this.setState({
        ...this.getState(),
        categories,
        waiting: false
      }, 'Загружены категории из АПИ');
    } catch (e) {
      this.setState({
        categories: [],
        waiting: false
      }, 'Ошибка получения категорий из АПИ')
    }
  }
}

export default CategoriesState;
