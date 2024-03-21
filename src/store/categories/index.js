import StoreModule from "../module";
/**
 * Состояние категория
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [
        {
          _id:"",
          title:"Все"
        }
      ],
    }
  }

  filtredCategory(items, parent = null, depth = 0) {
    let temp = []; // создаем временный массив
    items.forEach(item => {
      if ((!item.parent && !parent) || (item.parent && item.parent._id === parent)) { // если категория имеет родителя
        temp.push({
          ...item,
          title: ` ${' - '.repeat(depth).slice(0,-2)} ${item.title}`, // добавляем в временный массив категорию с опр.количеством дефизов
          _id: item._id
        });
        temp.push(...this.filtredCategory(items, item._id, depth + 1));
      }
    });
    return temp;
  }



  async setParams() {
    const result = await fetch('/api/v1/categories?fields=_id,title,parent(_id),child&limit=*').then(result => result.json())
    this.setState({
      ...this.getState(),
      list: [...this.initState().list,...this.filtredCategory(result.result.items)]
    }, 'Загружен список категориев из АПИ');
    console.log("ok")
  }
}

export default CategoriesState;