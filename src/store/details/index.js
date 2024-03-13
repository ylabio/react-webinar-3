import StoreModule from "../module";

class Details extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      result: {},
      isLoading: false,
    }
  }

  /**
   * Обновление состояния загрузчика
   * @param {Boolean} isLoading 
   */
  setIsLoading(isLoading) {
    this.setState({
      ...this.getState(),
      isLoading: isLoading = true,
    })
  }

  /**
   * Загрузка товара по id с подробностями о стране и категории
   * @param {String} id 
   */
  async loadDetails(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      result: json.result,
      isLoading: false,
    }, 'Загружены детали товара');
  }
}

export default Details;
