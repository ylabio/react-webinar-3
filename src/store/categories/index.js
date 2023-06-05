import StoreModule from '../module';
import {createCategories} from '../../utils';

class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
    };
  }

  getCategories = async () => {
    const result = await fetch(
      '/api/v1/categories?fields=_id,title,parent(_id)&limit=1000'
    );

    const json = await result.json();

    this.setState({
      ...this.getState(),
      categories: createCategories(json.result.items),
    });
  };
}

export default CategoriesState;
