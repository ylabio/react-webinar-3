import { setOptionCategory } from "../../utils";
import StoreModule from "../module";

class Categories extends StoreModule {
  initState() {
    return {
      categoriesProducts: [],
      categoriesSort: [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
    };
  }
  setCategories(props) {
    return this.setState(
      {
        ...this.getState(),
        ...props,
      },
      "Установлены параметры "
    );
  }

  async getCatalogProducts() {
    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,name,parent(_id)&limit=*`
      );
      const json = await response.json();
      if (response.ok) {
        this.setCategories({
          categoriesProducts: setOptionCategory(json.result.items),
        });
      } else {
        console.log(json.eror);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default Categories;
