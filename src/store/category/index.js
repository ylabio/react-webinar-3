import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {     
      categoryAll: [],     
      waiting: false
    }
  }

  async fetchCategory() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const categoryAll = await json.result.items.map(item => { return {value: item._id, title: item.title, parent: item.parent}})
    this.setState({
      ...this.getState(),
      categoryAll: categoryAll,      
      waiting: false
    }, 'Загружен список категорий');     
  } 

}

export default CategoryState;
