import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      categories: [],
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка категорий
   */
  async load() {
    // Сброс текущих категорий и установка признака ожидания загрузки
    this.setState({
      categories: [],
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      // Категории загружены успешно
      this.setState({
        categories: json.result.items,
        waiting: false
      }, 'Загружены категории из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      console.error(e)
      this.setState({
        categories: [],
        waiting: false
      });
    }
  }

  
}

export default CategoriesState;
