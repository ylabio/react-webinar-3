import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categoryList: [],
      rawCategoryList: [],
    };
  }

  async loadCategories() {
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const { items } = (await response.json()).result;
  
      const buildList = (items, parentId = null, level = 0) => 
        items
          .filter(item => (item.parent?._id || null) === parentId)
          .flatMap(item => [
            { _id: item._id, title: `${' - '.repeat(level)}${item.title}` },
            ...buildList(items, item._id, level + 1)
          ]);
  
      this.setState({
        rawCategoryList: items,
        categoryList: [
          { _id: '', title: 'Все' },
          ...buildList(items)
        ]
      });
  
    } catch (error) {
      console.error('Ошибка:', error);
      this.setState({ error: error.message });
    }
  }
}

export default CategoryState;
