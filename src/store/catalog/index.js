import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentItem:''
    }
  }
resetCurrentItem() {
    this.setState({
      ...this.getState(),
      currentItem: null, 
    }, 'Текущий товар сброшен');}
    async load({ limit = 10, skip = 0} = {}) {
        const url = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`;
        const response = await fetch(url);
        const json = await response.json();
        const items = json.result.items;
        const count = json.result.count;
        console.log({ skip, limit, count });
        this.setState({
            ...this.getState(),
            list: items,
            currentPage : Math.floor(skip / limit) + 1,
            lastPage: Math.ceil(count / limit)
        }, 'Загружены товары из АПИ с пагинацией');
    }
    async loadById(id) {
        const url = `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`;
        const response = await fetch(url);
        const json = await response.json();
        const item = json.result
        console.log(item);
        this.setState({
            ...this.getState(),
            currentItem: item,
        }, 'Загружены товары из АПИ по id');
    }
}

export default Catalog;
