import StoreModule from "../module";


class CategoriesState extends StoreModule {

  initState() {
    return {
      // category: '',
      filterValues: [],
      waiting: false,
    };
  }

  async fetchCategories() {
    const responseFilterValues = await fetch(`api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const jsonFilterValues = await responseFilterValues.json();
    this.setState({
      ...this.getState(),
      filterValues: jsonFilterValues.result.items,
      waiting: false
    }, 'Загружен список товаров из АПИ');

  }

}

export default CategoriesState;
