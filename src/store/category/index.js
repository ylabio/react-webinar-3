import StoreModule from '../module';

import { DEFAULT_CATEGORY } from '../../constants';

class CategoryState extends StoreModule {
  initState() {
    return {
      list: [],
      defaultCategory: { ...DEFAULT_CATEGORY },
    };
  }

  async initParams() {
    const urlParams = new URLSearchParams(window.location.search);

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*&lang=ru');

    if (response && response.ok) {
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: [{ ...DEFAULT_CATEGORY }, ...json.result.items],
        defaultCategory: { ...DEFAULT_CATEGORY },
      });
    }

    if (urlParams.has('category')) {
      const categoryId = urlParams.get('category');
      const id = categoryId.split(',')[0];
      const list = [...this.getState().list];

      for (let index = 0; index < list.length; index++) {
        if (list[index]._id === id) {
          this.setCurrentCategory({ ...list[index] });
          break;
        }
      }
    }
  }

  setCurrentCategory(currentCategory) {
    this.setState({
      ...this.getState(),
      defaultCategory: { ...currentCategory },
    });
  }

  resetCategory() {
    this.setState({
      ...this.getState(),
      defaultCategory: { ...DEFAULT_CATEGORY },
    });
  }
}

export default CategoryState;
