import { createTreeLists } from '../../utils';
import StoreModule from '../module';

export default class Categories extends StoreModule {
  initState() {
    return {
      categories: [],
    }
  }

  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(json.result.items),
      categories: [{title: 'Все', value: 'All'}, ...createTreeLists(json.result.items)]
    })

  }
}