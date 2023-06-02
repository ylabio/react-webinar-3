import StoreModule from "../module";
import {categoryListDataTransform} from "./dataTransform";

/**
 * Работа со списком категорий
 */
class CategoryState extends StoreModule {

  initState() {
    return {
      //для фильтра по категориям
      categoryList: [],
      categoryListWaiting: false,
    }
  }

  async categoryListLoad() {
    this.setState({
      ...this.getState(),
      categoryListWaiting: true,
    });
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();

    const categoryList = categoryListDataTransform(json.result.items);

    this.setState({
      ...this.getState(),
      categoryListWaiting: false,
      categoryList
    }, 'Загрузили категории из АПИ');
  }
}

export default CategoryState;
