import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [{
        _id: '',
        queryName: 'Все',
        title: 'Все',
        parent: null
      }],
    }
  }
 
  async getCategories() {
    const categoriesResp = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*'); //также через API достаем список категорий для сортировки
    const categoriesJson = await categoriesResp.json();
    const sortedCategories = [];
    categoriesJson.result.items.forEach((item) => {
      if (!item.parent) {
        sortedCategories.push({_id: item._id, queryName: item.title, title: item.title, parent: null})
      }
    })
    categoriesJson.result.items.forEach((item) => {
      if (item.parent) {
        let index = sortedCategories.findIndex((el) => (el._id == item.parent._id && el.parent == null));
        index !== -1 && sortedCategories.splice(index + 1, 0, {_id: item._id, queryName: item.title, title: `- ${item.title}`, parent: item.parent._id})
      }
    })
    categoriesJson.result.items.forEach((item) => {
      if (item.parent) {
        let index = sortedCategories.findIndex((el) => (el._id == item.parent._id && el.parent !== null));
        index !== -1 && sortedCategories.splice(index + 1, 0, {_id: item._id, queryName: item.title, title: `- - ${item.title}`, parent: item.parent._id})
      }
    })
    categoriesJson.result.items.forEach((item) => {
        if (item.parent) {
          let index = sortedCategories.findIndex((el) => (el._id == item.parent._id 
                                                          && el.parent !== null 
                                                          && sortedCategories.findIndex((elem) => elem._id == item._id) == -1));
          index !== -1 && sortedCategories.splice(index + 1, 0, {_id: item._id, queryName: item.title, title: `- - - ${item.title}`, parent: item.parent._id})
        }
      })
    this.setState({
      ...this.getState(),
      categories: [{ _id: '', queryName: 'Все', title: 'Все', parent: null }, ...sortedCategories],
    }, 'Загружен список категорий из АПИ');
  }

}

export default CategoryState;
