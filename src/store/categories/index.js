import StoreModule from "../module";

class Categories extends StoreModule {
  initState() {
    return {
      categories: []
    }
  }
  setCategoryChildrens(items, parent, level = 0) {
    const childrens = items
      .filter(item => item.parent && item.parent._id === parent)
      .flatMap(item => {
        const formattedItem = {
          value: item._id,
          title: '- '.repeat(level) + item.title
        };
        const childrens = this.setCategoryChildrens(items, item._id, level + 1);
        return [formattedItem, ...childrens];
      });
    return childrens;
  }

  async setCategories() {
    const response = await fetch(`api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const result = json.result.items
      .filter(item => !item.parent)
      .flatMap(rootItem => {
        const formattedItem = {
          value: rootItem._id,
          title: rootItem.title
        };
        const childrens = this.setCategoryChildrens(json.result.items, rootItem._id, 1)
        return [formattedItem, ...childrens]
      }).flat();
    this.setState({
      ...this.getState(),
      categories: result
    },'Установка категорий')
  }
}

export default Categories