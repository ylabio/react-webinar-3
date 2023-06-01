import StoreModule from "../module";

/**
 * Состояние категорий - пусть пока отдельно от каталога, т.к. есть собственные данные и логика
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [{ value: '', title: 'Все' }]
    };
  }

  async load() {
    // GET {{baseUrl}}/categories?fields=_id,title,parent(_id)&limit=*
    const response = await (
      await fetch(`/api/v1/categories?limit=*`)
    ).json();
    //console.log(response);
    const objects = response.result.items;
    const list = [{ value: '', title: 'Все' }];
    const childs = new Map();
    const roots = [];

    // todo: есть что улучшить
    const recurse = (obj, level = 0) => {
      list.push({ value: obj._id, title: '- '.repeat(level) + ' ' + obj.title });
      const ch = childs.get(obj._id);
      if (!ch) return;
      level++;
      ch.forEach(obj => recurse(obj, level));
    };

    objects.forEach(obj => {
      const p = obj.parent;
      if (p) {
        if (!childs.has(p._id))
          childs.set(p._id, [obj]);
        else
          childs.get(p._id).push(obj);
      } else
        roots.push(obj);
    });

    roots.forEach(obj => recurse(obj));

    this.setState({
      ...this.getState(),
      list
    }, 'Категории загружены.');
  }
}

export default CategoriesState;