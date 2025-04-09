import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.STORAGE_KEY = `${name}_state`;
  }

  initState() {
    const savedState = this.getSavedState();

    return {
      list: [],
      count: 0,
      currentPage: savedState?.currentPage || 1,
      totalPages: 0,
      onePagesItemSum: savedState?.onePagesItemSum || 5,
    };
  }

  getSavedState() {
    try {
      const saved = sessionStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to parse saved state', e);
      return null;
    }
  }

  saveState(state) {
    try {
      const toSave = {
        currentPage: state.currentPage,
        onePagesItemSum: state.onePagesItemSum
      };
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${this.getState().onePagesItemSum}&skip=${(this.getState().currentPage - 1)*this.getState().onePagesItemSum}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const newState = {
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      totalPages: Math.round(json.result.count/this.getState().onePagesItemSum),
    };

    this.setState(newState, 'Загружены товары из АПИ');
    this.saveState(newState);
  }

  setCurrentPage(_id) {
    const newState = {
      ...this.getState(),
      currentPage: _id,
    };

    this.setState(newState, 'Произошла пагинация');
    this.saveState(newState);
    this.load();
  }

  onItemSumChange(onePagesItemSum) {
    const newState = {
      ...this.getState(),
      onePagesItemSum: onePagesItemSum,
    };

    this.setState(newState, 'Произошел выбор количества показанных элементов списка');
    this.saveState(newState);
    this.load();
  }
}

export default Catalog;
