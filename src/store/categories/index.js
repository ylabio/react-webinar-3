import StoreModule from "../module";
import { parseCategories } from "../../utils";

// Класс для управления состоянием категорий
class CategoriesState extends StoreModule {
  // Инициализация начального состояния
  initState() {
    return {
      categoryArr: [],
    };
  }

  // Получение списка категорий
  async getCategories() {
    try {
      const res = await fetch(
        "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
      );
      const json = await res.json();
      this.setCategories(json.result.items);
    } catch (err) {
      this.setCategories([]);
    }
  }

  // Установка списка категорий
  setCategories(categoryArr = []) {
    this.setState(
      {
        ...this.getState(),
        categoryArr: [
          { value: "", title: "Все" },
          ...parseCategories(categoryArr),
        ],
      },
      "Добавление категорий каталога"
    );
  }
}

export default CategoriesState;
