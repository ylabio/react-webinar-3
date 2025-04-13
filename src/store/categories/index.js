import StoreModule from '../module';

/**
 * Состояние категорий: дерево, плоский список и поиск по value
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      tree: [],
      flat: [],
      categoriesMap: {},
    };
  }

  async getCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const rawItems = json.result.items || [];

    const tree = this._buildCategoryMapTree(rawItems);
    const flat = this._flattenCategoryTree(tree);

    const defaultCategory = {
      title: 'Все',
      value: '',
    };

    const map = {};
    for (const item of rawItems) {
      map[item._id] = item;
    }

    this.setState({
      ...this.getState(),
      tree,
      flat: [defaultCategory, ...flat],
      categoriesMap: map,
    }, 'Загружены категории из АПИ');
  }

  _buildCategoryMapTree(items = []) {
    const map = new Map();

    for (const item of items) {
      const parentId = item.parent?._id || 'parent';

      if (!map.has(parentId)) {
        map.set(parentId, []);
      }

      map.get(parentId).push({
        _id: item._id,
        title: item.title,
      });
    }

    const buildTreeFrom = (id, depth = 0) => {
      const children = map.get(id) || [];

      return children.map(child => {
        const nestedChildren = buildTreeFrom(child._id, depth + 1);

        const valueIds = [child._id];
        nestedChildren.forEach(n => valueIds.push(...n.valueIds));

        return {
          ...child,
          title: `${'- '.repeat(depth)}${child.title}`,
          valueIds,
          children: nestedChildren,
        };
      });
    };

    return buildTreeFrom('parent');
  }

  _flattenCategoryTree(tree) {
    const result = [];

    for (const node of tree) {
      result.push({
        title: node.title,
        id: node._id,
        value: node.valueIds.join(','),
        valueIds: node.valueIds,
      });

      if (node.children?.length) {
        result.push(...this._flattenCategoryTree(node.children));
      }
    }

    return result;
  }


  getCategoryByValue(value) {
    if (!value) return null;

    const firstId = value.split(',')[0];
    return this.getState().categoriesMap[firstId] || null;
  }

}

export default CategoriesState;
