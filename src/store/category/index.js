import { transformCategories } from "../../utils";
import StoreModule from "../module";

class Category extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  /**
   * Загрузка категорий
   */
  async load() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Загрузка категорий"
    );

    const response = await fetch(
      "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
    );
    const json = await response.json();
    const list = transformCategories(json.result.items);
    this.setState(
      { ...this.getState(), list, waiting: false },
      "Загружены категории"
    );
  }
}

export default Category;
