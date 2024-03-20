import StoreModule from "../module";

class CategoryState extends StoreModule {

  initState() {
    return {
      items: [],
    };
  }

  itemsToOptions(items, parent = null, depth = 0) {
    const options = [];
    items.forEach(item => {
      if ((item.parent && item.parent._id === parent) || (!item.parent && !parent)) {
        options.push({
          ...item,
          title: ` ${' - '.repeat(depth)} ${item.title}`,
          value: item._id
        });
        options.push(...this.itemsToOptions(items, item._id, depth + 1));
      }
    });
    return options;
  }

  async load() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id),children&limit=*`);
    const json = await response.json();

    const formattedItems = this.itemsToOptions(json.result.items);
    this.setState({
      items: [{
        _id: "all",
        title: "Все",
        value: 'all',
        parent: null
      },
        ...formattedItems
      ],
    }, 'Загружены категории');
  }
}

export default CategoryState;
