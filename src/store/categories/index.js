import StoreModule from "../module";
import {formatCategories} from "../../utils";

/**
 * Категории товаров
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: '',
    };
  }
  async loadCategories(){
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const categoryList = await response.json();
    const formattedCategory = formatCategories(categoryList.result.items);
    this.setState({
      ...this.getState(),
      categories: formattedCategory
    })
  }

}
export default CategoriesState;
