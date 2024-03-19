import StoreModule from "../module";

/**
 * Список всех категорий
 */
class CategoryState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка всех категорий
   * @param id {String}
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      // Товар загружен успешно
      this.setState({
        data: json.result,
        waiting: false
      }, 'Загружены категории из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false
      });
    }
  }
}

export default CategoryState;
