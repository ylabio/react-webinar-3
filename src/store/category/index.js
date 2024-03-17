import StoreModule from "../module";

class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  async load() {
    // установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categories: json.result.items,
      waiting: false
    }, 'Загружены категории');
  }
}

export default CategoryState;