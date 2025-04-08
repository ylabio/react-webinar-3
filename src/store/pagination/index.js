import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    const params = new URLSearchParams(window.location.search);
    return {
      limit: parseInt(params.get('limit')) || 10,
      page: parseInt(params.get('page')) || 1,
    };
  }

  onPageChange(value) {
    this.updateUrlAndState({ page: value });
  }

  onLimitChange(value) {
    this.updateUrlAndState({ limit: value, page: 1 });
  }

  //Для отслеживания навигации в браузере
  onInit() {
    this.handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get('page')) || 1;
      const limit = parseInt(params.get('limit')) || 10;

      this.setState({ page, limit });
    };

    window.addEventListener('popstate', this.handlePopState);
  }

  onDestroy() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  updateUrlAndState(newParams) {
    const current = this.getState();
    const updated = { ...current, ...newParams };

    const url = new URL(window.location);
    url.searchParams.set('limit', updated.limit);
    url.searchParams.set('page', updated.page);
    window.history.pushState({}, '', url);

    this.setState(updated);
  }
}

export default Pagination;
