import StoreModule from '../module';

class CategoriesStore extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false
    }
  }

  async getCategories() {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Запросили категории товаров');

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      waiting: false
    }, 'Загружен список категорий из АПИ');
  }
}

export default CategoriesStore;