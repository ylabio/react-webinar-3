import StoreModule from "../module";

/**
 * Категории товаров
 */
class CategoryState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка категорий товаров
   * @return {Promise<void>}
   */
  async load() {

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);

      const json = await response.json();
      const list = this.modifyItems(json.result.items);

      // Категории загружены успешно
      this.setState({
        list: [
          {
            _id: "1",
            title: "Все",
            value: 'all',
            parent: null
          },
          ...list
        ],
        waiting: false
      }, 'Загружены категории из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        list: [],
        waiting: false
      });
    }
  }

  modifyItems(items, parentId = null, depth = 0) {
    const result = [];
    items.forEach(item => {
      if ((item.parent && item.parent._id === parentId) || (!item.parent && !parentId)) {
        result.push({
          ...item,
          title: ' -'.repeat(depth) + ' ' + item.title,
          value: item._id
        });
        const children = this.modifyItems(items, item._id, depth + 1);
        result.push(...children);
      }
    });
    return result;
  }
}

export default CategoryState;
