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
      const json = await response.json();
      const categories = json.result.items;

      const map = {};
      categories.forEach(item => {
        map[item._id] = { ...item, children: [] };
      });

      const parents = [];
      categories.forEach(item => {
        if (item.parent?._id) {
          map[item.parent._id].children.push(map[item._id]);
        } else {
          parents.push(map[item._id]);
        }
      });

      const spreadCategories = (nodes, level = 0) => {
        return nodes.flatMap(item => [
          { _id: item._id, title: `${' - '.repeat(level)} ${item.title}` },
          ...spreadCategories(item.children, level + 1),
        ]);
      };
  
      const resultList = spreadCategories(parents);

      resultList.unshift({ _id: '', title: 'Все' });
 
      this.setState(
        {
          rawCategoryList: categories,
          categoryList: resultList,
        },
        'Загружен список категорий с иерархией',
      );
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  }
}

export default CategoryState;
