import getFlatTree from "./getFlatTree";
import StoreModule from "../module";

/**
 * Категории товаров
 */
class СategoriesState extends StoreModule {

  initState() {
    return {
        categories : [],
    }
  }

    /**
   * Инициализация категорий
   * @returns {Promise<void>}
   */
    async initCategories() {
        const response = await fetch(`/api/v1/categories?lang=ru&limit=100&skip=0&fields=%2A`);
        const json = await response.json();
        this.setState({
          ...this.getState(),
          categories : getFlatTree(json.result.items,"- ")
        }, 'Загружены категории');
      }

  
}

export default СategoriesState;
