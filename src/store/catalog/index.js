import { loadAll } from '../../components/util/http';
import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,       
      page: 1,       
      limit: 10,      
      totalPages: 1 
    };
  }
  async loadCount() {
    const items = await loadAll();
    console.log(items);
    this.setState({
      ...this.getState(),
      count: items.length,
      totalPages: Math.ceil(items.length / this.getState().limit)
    });
  }

  setParams(page, limit) {
    const newState = { ...this.getState() };
    
    if (page !== undefined) {
      newState.page = page;
    }
    
    if (limit !== undefined) {
      newState.limit = limit;
      newState.totalPages = Math.ceil(newState.count / limit);
      newState.page = 1;
    }

    this.setState(newState);
  }

  async load() {
    const { limit, page } = this.getState();
    const skip = (page - 1) * limit;
    
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    
    this.setState({
      ...this.getState(),
      list: json.result.items,
    });
  }
  }


export default Catalog;
