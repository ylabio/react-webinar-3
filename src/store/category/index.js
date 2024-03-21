import StoreModule from "../module";

class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  async load() {
    // установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    console.log(json)

    this.setState({
      ...this.getState(),
      categories: this.reformat(json.result.items),
      waiting: false
    }, 'Загружены категории');
  }

  reformat(data = [], parentId = null, depth = 0) {
    const result = [];

    data.forEach((item) => {
      if ((parentId === null && item.parent === null) || (item.parent && item.parent._id === parentId)) {
        const title = "- ".repeat(depth) + item.title;
        result.push({ value: item._id, title });
        const children = this.reformat(data, item._id, depth + 1);
        result.push(...children);
      }
    });
    return result;
  }
}

export default CategoryState;