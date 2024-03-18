import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      data: [],
      waiting: false
    };
  }

  async getCategories() {
    this.setState({...this.getState(), waiting: true});

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const { result } = await response.json();

    const resultData = result.items.map(item => {
      return { title: item.title, value: item._id, parent: (item.parent?._id || null) }
    })

    this.setState({
      ...this.getState(),
      data: resultData,
      waiting: false
    });
  }

}

export default CategoriesState;