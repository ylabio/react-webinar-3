import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatigoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      error: "",
    };
  }

  async setCategories() {
    function recursion(data = [], parentId = null, depth = 0) {
      const result = [];

      data.map((item) => {
        if (
          item.parent === parentId ||
          (item.parent && item.parent._id === parentId)
        ) {
          const title = "- ".repeat(depth) + item.title;
          result.push({ value: item._id, title });
          const children = recursion(data, item._id, depth + 1);
          result.push(...children);
        }
      });

      return result;
    }
    try {
      const response = await fetch(
        "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
      );
      const json = await response.json();
      if (!response.ok) {
        setUser({ categories: [], error: json.error });
        return;
      }
      const result = [
        { value: "", title: "Все" },
        ...recursion(json.result.items),
      ];
      this.setState({
        ...this.getState(),
        categories: result,
        error: "",
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: `Ошибка загрузки категорий: ${error}`,
      });
    }
  }
}

export default CatigoriesState;
