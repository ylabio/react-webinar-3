import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
      selectedCategory: '',
    };
  }

  async getCategories() {
    const categories = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await categories.json();

    this.setState({
      ...this.getState(),
      list: [{ title: 'Все', _id: '', parent: null }, ...json.result.items],
    });
  }
}

export default CategoriesState;
