import StoreModule from "../module";

import { categoriesFormat } from "../../utils";


class CategoriesState extends StoreModule {


  initState() {
    return {
      categories: [{value: "", title: "Все"}],
      waiting: false
    }
  }


  async setCategories() {

    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Началась загрузка категорий');

    const fetchedCategories = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const jsonCategories = await fetchedCategories.json();
    const newCategories = categoriesFormat(jsonCategories.result.items, [{value: "", title: "Все"}])
    console.log(jsonCategories)
    console.log(categoriesFormat(jsonCategories.result.items, [{value: "", title: "Все"}]))
    this.setState({
      ...this.getState(),
      categories: newCategories,
      waiting: false
    }, 'Загружены категории');
  }
}

export default CategoriesState;
