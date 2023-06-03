import { stackParents } from "../../utils";
import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      categoriesList: [{ _id: '', title: 'filter.all' }]
    }
  }

  setCategories(list) {
    this.setState({
        categoriesList: [...this.getState().categoriesList, ...stackParents(list)]
    }, 'Категории установлены')
  }

  async getCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();

    this.setCategories(json.result.items)
  }
}

export default CategoriesState;