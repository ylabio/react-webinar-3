import StoreModule from "../module";

/**
 * Категории для каталога товаров
 */
class CategoriesState extends StoreModule {

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

  /**
   * Загрузка списка категорий
   */
  async load() {
    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      list: [],
      waiting: true
    }, 'Запрос списка категорий');

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent&sort=order&limit=*`);
      const json = await response.json();

      const list = [];

      const fillList = (parentId, level) => {
        for (let item of json.result.items) {
          if ((!parentId && !item.parent) || (item.parent && item.parent._id === parentId)) {
            list.push({...item, level});
            fillList(item._id, level + "- ");
          }
        }
      }

      fillList(null, "");

      this.setState({
        ...this.getState(),
        list,
        waiting: false
      }, 'Загружен список категорий из АПИ');
    } catch (e) {
      this.setState({
        list: [],
        waiting: false
      }, 'Ошибка загрузки списка категорий из АПИ');
    }
  }
}

export default CategoriesState;
