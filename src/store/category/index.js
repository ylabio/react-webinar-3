import StoreModule from "../module";

/**
 * Информация о категориях товаров
 */
class CategoryState extends StoreModule {

  initState() {
    return {
      category: [],
      categoryError: null,
    }
  }

  getCategories = async () => {
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');

      const data = (await response.json()).result.items;

      this.setState({
        category: this.transform(data)
      }, 'Загрузка категорий для фильтра');
    } catch (error) {
      this.setState({
        categoryError: error
      }, 'Ошибка при загрузке категорий');
    }
  }

  transform = (data = [], parentId = null, depth = 0) => {
    const result = [];

    for (const item of data) {
      if ((parentId === null && item.parent === null) || (item.parent && item.parent._id === parentId)) {
        const title = "- ".repeat(depth) + item.title;
        result.push({ value: item._id, title });
        const children = this.transform(data, item._id, depth + 1);
        result.push(...children);
      }
    }

    return result;
  }
}

export default CategoryState;
