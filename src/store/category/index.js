import StoreModule from '../module';


class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }

  async loadCategories() {
  const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
  const json = await response.json();
  const parents = json.result.items.filter( item => item.parent === null);
  const categories = [{value: '', title: "Все"}];
  for (const parent of parents) {
   categories.push({value: parent._id, title: parent.title});
   json.result.items.map(category => {
    let index;
    if (category.parent !== null && category.parent._id === parent._id) {
      categories.push({value: category._id, title: "- " + category.title});
      index =  category._id;
      json.result.items.map(category => {
        if (category.parent !== null && category.parent._id === index) {
          categories.push({value: category._id, title: "-- " + category.title});
        }
      })
     }
   });
  }

  this.setState(
      {
        ...this.getState(),
        categories: categories,
      },
      'Загружен список категорий из АПИ',
    );
  }
}


export default CategoryState;
