import StoreModule from '../module';

class CategoryState extends StoreModule {
  initState() {
    return {
      list: [],
      tree: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  async load() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      const items = json.result.items.map(item => ({
        _id: item._id,
        title: item.title,
        parentId: item.parent?._id || null,
      }));

      // Иерархия категорий
      const buildTree = (items, parentId = null) => {
        return items
          .filter(item => item.parentId === parentId)
          .map(item => ({
            ...item,
            children: buildTree(items, item._id),
          }));
      };

      // Категории загружены успешно
      this.setState(
        {
          list: items,
          tree: buildTree(items),
          waiting: false,
        },
        'Загружены категории из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        list: [],
        tree: [],
        waiting: false,
      });
    }
  }
}

export default CategoryState;
