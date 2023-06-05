import {stackParents} from "../../utils";
import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      categoriesList: []
    }
  }

  setCategories(list) {
    this.setState({
        categoriesList: [{ _id: '', value: 'filter.all' }, ...this.getState().categoriesList, ...stackParents(list)]
    }, 'Категории установлены')

    stackParents(list)
  }

  async getCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();

    this.setCategories(json.result.items)
  }
}

export default CategoriesState;