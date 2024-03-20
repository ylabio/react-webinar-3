import { categoriesFormat } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [{ value: "", title: "Все" }],
      waiting: false,
    };
  }

  // Получаем список категорий из api, форматируем и вносим в стейт
  async getCategories() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Загружаем список категорий"
    );

    try {
      const response = await fetch(
        `/api/v1/categories?lang=ru,fields=_id,title,parent(_id)&limit=*`
      );
      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          list: [
            { value: "", title: "Все" },
            ...categoriesFormat(null, json.result.items),
          ],
          waiting: false,
        },
        "Категории загружены"
      );
    } catch {
      this.setState(
        {
          ...this.getState(),
          list: [{ value: "", title: "Все" }],
          waiting: false,
        },
        "Application error"
      );
    }
  }
}

export default CategoriesState;
