import StoreModule from '../module';

class CategoriesStore extends StoreModule {
  initState() {
    return {
      items: [],
      pending: false
    }
  }

  async getCategories() {
    this.setState({
      ...this.getState(),
      pending: true
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const { result: { items } } = await response.json();
      this.setState({
        ...this.getState(),
        items,
        pending: false
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      this.setState({
        ...this.getState(),
        pending: false
      })
    }
  }
}


export default CategoriesStore;