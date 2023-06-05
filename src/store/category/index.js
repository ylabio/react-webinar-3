import StoreModule from "../module";
import {parseCategoryList} from "../../utils";

class CategoryState extends StoreModule {
  initState() {
    return {
      categoryList: [],
    }
  }
  async getCategoryList(){
    try {
      const res = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await res.json();
      this.setCategoryList(json.result.items);
    } catch (err) {
      this.setCategoryList([]);
    }
  }
  setCategoryList(categoryList = []) {
    this.setState({
      ...this.getState(),
      categoryList: [{value: '', title: 'Все'}, ...parseCategoryList(categoryList)]
    }, 'Добавление категорий каталога');
  }
}

export default CategoryState;
