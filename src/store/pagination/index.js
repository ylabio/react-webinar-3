import StoreModule from "../module";

class Pagination extends StoreModule {

  initState() {
    return {
      skip: 0
    }
  }

  nextPage() {
    this.skip += 10;
  }

  prevPage() {
    this.skip -= 10;
  }
}

export default Pagination;
