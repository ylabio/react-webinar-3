import { categoriesToDisplay } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
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

  async fetchCategories() {
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,name,parent(_id)&limit=*`);
      const categories = await response.json();
      
      this.setState({...this.getState(), list: categoriesToDisplay(categories?.result?.items || []) || []})
    }catch(e){
      console.log(e)
    }
  }
}

export default CategoriesState;
