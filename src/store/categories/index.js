import StoreModule from "../module";

/**
 * Состояние категорий - список получаемых категорий с API
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    }
  }

  async setCategories() {

    const responeCategories = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const jsonCategories = await responeCategories.json();
    const nestedCategories = this.getCategories(jsonCategories.result.items);

    this.setState({
      categories: [
        {
          _id: 1,
          title: 'Все',
          value: 'all',
          parent: null,
        },
        ...nestedCategories
      ],
      waiting: false,
    }, 'Загружен список категорий')
  }


  // Создаём список категорий из данных API
  getCategories(categories, parentId = null, nesting = 0) {
    const result = [];
    categories.forEach(category => {
      if (category.parent && category.parent._id === parentId || (!category.parent && !parentId)) {
        result.push({
          _id: category._id,
          title: ('- ').repeat(nesting) + ' ' + category.title,
          value: category._id,
          parent: parentId,
        })
        const nestedCategories = this.getCategories(categories, category._id, nesting + 1);
        result.push(...nestedCategories);
      }
    });
    return result;
  }
}

export default CategoriesState;