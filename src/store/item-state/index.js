import StoreModule from '../module';

class ItemState extends StoreModule {
  initState() {
    return {
      item: {},
    };
  }

  setItem(item){
    this.setState({item:item})
  }
}

export default ItemState;
