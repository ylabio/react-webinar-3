import StoreModule from '../module';

/**
 * Состояние категорий
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [], // Иерархический список категорий
      current: null, // Текущая выбранная категория
      waiting: false, // Признак загрузки
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();

    // Функция построения иерархии
    const buildHierarchy = (categories, parentId = null, level = 0) => {
      return categories
        .filter(category => {
          if (parentId === null) return !category.parent;
          return category.parent?._id === parentId;
        })
        .flatMap(category => [
          { ...category, level },
          ...buildHierarchy(categories, category._id, level + 1),
        ]);
    };

    this.setState({
      ...this.getState(),
      list: buildHierarchy(json.result.items),
      waiting: false,
    });
  }
}

export default CategoriesState;
