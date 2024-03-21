import { constructCategoryList } from "../../utils";
import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
      error: null,
    };
  }

  async load(lang) {
    const apiCategoriesParams = {
      limit: "*",
      fields: "_id,title,parent(_id)",
      lang,
    };
    try {
      const response = await fetch(
        `/api/v1/categories?${new URLSearchParams(apiCategoriesParams)}`
      );

      const { result, error } = await response.json();

      if (error) {
        throw new Error(JSON.stringify(error));
      }

      this.setState({
        ...this.getState(),
        list: constructCategoryList(result.items),
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: JSON.parse(error.message),
      });
    }
  }
}

export default CategoriesState;
