import StoreModule from "../module";

class Categories extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  buildCategoriesTree(categories, parentId = null, depth = 0) {
    const nestedTitles = [];
    categories.forEach(category => {
      if (category.parent === parentId || (category.parent && category.parent._id === parentId)) {
        const titlePrefix = depth > 0 ? '- '.repeat(depth) : '';
        const nestedTitle = { value: category._id, title: titlePrefix + category.title };
        nestedTitles.push(nestedTitle);
        nestedTitles.push(...this.buildCategoriesTree(categories, category._id, depth + 1));
      }
    });
    return nestedTitles;
  }

  async initCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const categoriesTree = this.buildCategoriesTree(json.result.items);
    categoriesTree.unshift({value: '', title: 'Всё'})
    this.setState({
      ...this.getState(),
      categories: categoriesTree,
      waiting: false
    }, 'Загружен список категорий из АПИ');
  }
}

export default Categories;
