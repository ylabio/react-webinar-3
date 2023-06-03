import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      items: [],
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка списка категорий
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего списка категорий и установка признака ожидания загрузки
    this.setState({
      items: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      // Список категорий загружен успешно
      this.setState({
        items: json.result.items,
        waiting: false
      }, 'Загружен список категорий из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        items: [],
        waiting: false
      });
    }
  }
}

export default CategoriesState;
