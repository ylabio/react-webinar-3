import StoreModule from "../module";


class Item extends StoreModule{

  initState(){
    return {
      selectedItem: {}
    }
  }

  async load({_id}){
    const response = await fetch('/api/v1/articles/'+_id);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      selectedItem: json.result
    }, 'Загружен товар с _id='+_id);
  }
}

export default Item;