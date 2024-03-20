import StoreModule from "../module";

class CategoryState extends StoreModule {
/**
   * Начальное состояние
   * @return {Object}
   */
initState() {
  return {
    // category: 'Все',
    waiting: false,
    categories: [{_id: '0', title: 'Все', value: 'Все', parent: null}],
    sortedCategories: [],
  }
}

async getCategories() {
  this.setState({
    ...this.getState(),
    categories: [{_id: '0', title: 'Все', value: 'Все', parent: null}],
    sortedCategories: []
  }, 'Обнулен список каталога');

  const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
  const json = await response.json();
  this.setState({
    ...this.getState(),
    categories: this.formatCategories(json),
  }, 'Загружен список категорий из АПИ');
  return this.getState().categories;
}

formatCategories(json){
  const categories = [...this.getState().categories, ...json.result.items.map(category=> ({...category, value: category._id}))];
  this.getSubCategories(categories);
   return this.getState().sortedCategories;
}

findCategoryIdByTitle(value){
  let id;
  const category = this.getState().categories.filter(category=> category.value === value);
  if(category.length) id = category[0]._id;
  return id ;
}

getSubCategories(categories, parentId = null, count = 0) {

   //todo порядок вложенности, дефис

  const childs = categories.filter(category=> (parentId === null || category.parent === null) ? category.parent === parentId : category.parent._id === parentId);
  // const childsIds = childs.map(category => category._id);
 // console.log('childsIds',childsIds.includes(category.parent._id));
  const sortedCategories = childs.map(category => {

    let res;

    switch (true) {
      case (parentId === null) :
      this.getState().sortedCategories.push({...category,title: `${' - '.repeat(count)}${category.title}`});
      res = this.getSubCategories(categories, category._id, count);
      break;

      case (parentId == category.parent._id) :
        // console.log('count',count, category);
      count = 1;
      this.getState().sortedCategories.push({...category,title: `${' - '.repeat(count)}${category.title}`});
      res = this.getSubCategories(categories, category._id, count++);
      break;

      // default:
      // res = this.getSubCategories(categories, category._id, count++);
    }
    return res;
  });
    return sortedCategories;
  }

}

export default CategoryState;