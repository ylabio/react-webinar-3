import StoreModule from "../module";
import { getCategoriesUtils } from "../../utils";

class Categories extends StoreModule {
  initState() {
    return {
      categories: [],
    };
  }

  async getCategories() {
    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.result && data.result.items) {
        const categories = getCategoriesUtils(data);
        this.setState(
          {
            ...this.getState(),
            categories: categories,
          },
          "Категории загружены и установлены в нужном порядке"
        );
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }
}

export default Categories;
