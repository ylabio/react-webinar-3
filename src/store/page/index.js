import StoreModule from '../module';

class Page extends StoreModule {
  initState() {
    return {
      currentPage: 'main',
    };
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }
}

export default Page;
