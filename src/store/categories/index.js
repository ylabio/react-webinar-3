import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      categories: [],
      waiting: false,
    }
  }

  async init() {
    await this.fetchCategories();
  }

  async fetchCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categories: this.#parseCategories(json.result.items),
    }, 'Загружен список категорий');
  }

  #parseCategories(categories) {
    return [{value: "", title: "Все"}, ...this.#generateCategoryNames(categories)];
  }

  #generateTree(items) {
    let tree = [];
    let mappedItems = {};
    let item;
    let mappedItem;

    for (let i = 0, len = items.length; i < len; i++) {
      item = items[i];
      mappedItems[item._id] = item;
      mappedItems[item._id]['children'] = [];
    }

    for (let id in mappedItems) {
      if (mappedItems.hasOwnProperty(id)) {
        mappedItem = mappedItems[id];
        if (mappedItem.parent) {
          mappedItems[mappedItem.parent._id]['children'].push(mappedItem);
        }
        else {
          tree.push(mappedItem);
        }
      }
    }
    return tree;
  }

  #generateCategoryNames(categories) {
    const tree = this.#generateTree(categories);

    let visited = [];

    let traverse = (prefix, node) => {
      visited.push({value: node._id, title: `${prefix}${node.title}`});
      if (node.children) {
        prefix = `- ${prefix}`;
        for (let child of node.children) {
          traverse(prefix, child);
        }
      }
    }

    tree.forEach(branch => traverse("", branch));
    return visited;
  }
}

export default CategoriesState;