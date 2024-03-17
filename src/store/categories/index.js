import StoreModule from "../module";

/**
 * Состояние списка параметров фильтрации
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [{value: '', title: 'Все'}],
      waiting: false
    }
  }

  /**
   * Сброс состояния к начальному
   */
  resetState() {
    this.setState({
      ...this.getState(),
      list: [{value: '', title: 'Все'}],
      waiting: false
    })
  }

  /**
   * Функция сортировки списка категорий
   * @param {Array} categories 
   * @param {String} parentId 
   * @param {Number} count 
   * @returns {Array}
   */
  sorting(categories, parentId = null, count = 0) {
    const sortingCategories = [];

    for (let category of categories) {
      if (category.parent && category.parent._id === parentId) {
        const defis = ' - '.repeat(count);
        sortingCategories.push({ value: category._id, title: `${defis} ${category.title}` });
        const items = this.sorting(categories, category._id, count + 1);
        sortingCategories.push(...items);
      } 
      else if (!category.parent && !parentId) {
        const defis = ' - '.repeat(count);
        sortingCategories.push({ value: category._id, title: `${defis} ${category.title}` });
        const items = this.sorting(categories, category._id, count + 1);
        sortingCategories.push(...items);
      }
    }
    return sortingCategories;
  }

  /**
   * Загрузка списка параметров фильтрации
   */
  async loadCategories() {
    this.resetState();

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: [...this.getState().list, ...this.sorting(json.result.items)]
    })
  }
}

export default CategoriesState;