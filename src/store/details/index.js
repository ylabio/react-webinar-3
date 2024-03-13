import StoreModule from "../module";

class Details extends StoreModule {

  initState() {
    return {
      details: {}
    }
  }

  async loadDetails(id) {
    try{
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
          const json = await response.json();
          this.setState({
            ...this.getState(),
            details: json.result
          }, `Получили детали товара с id ${id}`);
          return json.result
    }catch(error){
      throw new Error(error.message);
    }
  }
}

export default Details;
