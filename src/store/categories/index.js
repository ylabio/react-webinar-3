import StoreModule from '../module';

/**
 * Информация о категориях товаров
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      data: [], // массив категорий
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка категорий товаров
   ** @return {Promise<void>}
   */
  async load() {
    // Сброс текущего состояния и установка признака ожидания загрузки
    this.setState({
      data: [],
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`,
      );
      const json = await response.json();

      // Категрии загружены успешно
      this.setState(
        {
          data: json.result.items,
          waiting: false,
        },
        'Загружены категории товаров из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: [],
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
