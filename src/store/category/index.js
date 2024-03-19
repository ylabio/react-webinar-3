import StoreModule from "../module";

class CategoryState extends StoreModule {
  initState() {
    return {
      list: [{value: '', title: 'Все'}],
      waiting: false
    }
  }


  /**
   * Получение категории.
   * @return {Promise<void>}
   */
  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    // Функция для рекурсивного добавления категорий с учетом их иерархии
    const flattenCategories = (categories) => {
      function getParentCategory(category) {
        return category.parent ? categories.find(c => c._id === category.parent._id) : null;
      }

      function getHierarchyLevel(category) {
        let level = 0;
        let parent = getParentCategory(category);
        while (parent) {
          level++;
          parent = getParentCategory(parent);
        }
        return level;
      }

      function buildModifiedCategories(category, modifiedCategories) {
        const hierarchyLevel = getHierarchyLevel(category);
        const prefix = ' -'.repeat(hierarchyLevel);
        const modifiedTitle = prefix + ' ' + category.title;
        modifiedCategories.push({ value: category._id, title: modifiedTitle });

        categories
          .filter(c => c.parent && c.parent._id === category._id)
          .forEach(child => buildModifiedCategories(child, modifiedCategories));
      }

      const modifiedCategories = [];
      categories.filter(category => !category.parent).forEach(rootCategory => {
        buildModifiedCategories(rootCategory, modifiedCategories);
      });

      return modifiedCategories;
    };

    const categories = flattenCategories(json.result.items);
    this.setState({
      ...this.getState(),
      list: [{value: '', title: 'Все'}, ...categories],
      waiting: false
    }, 'Загружены категории товаров из АПИ');
  }
}

export default CategoryState