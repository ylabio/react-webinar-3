import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
      error: null,
      waiting: false,
    }
  }

  /**
   * Загрузка всех категорий с выбором языка
   * @param id {String}
   * @return {Promise<void>}
   */
  async loadCategories(lang = 'ru') {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const apiParams = {
      lang,
      fields: '_id,title,parent(_id),order',
      sort: '-order',
    };

    try {
      const response = await fetch(`/api/v1/categories?${new URLSearchParams(apiParams)}`);
      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result?.items || [],
        error: json.error || null,
        waiting: false,
      }, 'Загружен список категорий из АПИ');
    } catch(e) {
      this.setState({
        ...this.getState(),
        list: [],
        error: e,
        waiting: false,
      }, 'Ошибка при загрузке списка категорий');
    }
  }
}

export default CategoriesState;