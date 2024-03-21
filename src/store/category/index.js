import StoreModule from "../module";

class CategoryState extends StoreModule {
/**
   * Начальное состояние
   * @return {Object}
   */
initState() {
  return {
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
  // this.getSubCategories(categories);
   return this.getSubCategories(categories);
}

findCategoryIdByTitle(value){
  let id;
  const category = this.getState().categories.filter(category=> category.value === value);
  if(category.length) id = category[0]._id;
  return id ;
}

getSubCategories(categories, parentId = null, count = 0) {
const subCategories = [];
   console.log('categories', categories);
  // console.log('parentId', parentId);

  // const parents = categories.filter(category=> (parentId === null || category.parent === null) ? category.parent === parentId : category.parent._id === parentId);
  categories.map(category => {
    // {_id: '0', title: 'Все', value: 'Все', parent: null}
    let children;

    switch (true) {

      case (!category.parent && !parentId) :
        subCategories.push({...category,title: `${'- '.repeat(count)}${category.title}`});
      children = this.getSubCategories(categories, category._id, count++);
      subCategories.push(...children);
      break;

      case (category.parent && parentId === category.parent._id) :
        subCategories.push({...category,title: `${'- '.repeat(count)}${category.title}`});
      children = this.getSubCategories(categories, category._id, count++);
      subCategories.push(...children);
      break;
    }
  });
    return subCategories;
  }

}

export default CategoryState;