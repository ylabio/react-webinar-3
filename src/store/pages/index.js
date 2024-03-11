import StoreModule from "../module";

class Pages extends StoreModule {
    
    initState() {
        return {
          currentPage: 1,
          pagesQuantity: 0,
        }
      }
    
    async getPagesQuantity() {
        const response = await fetch('/api/v1/articles?&fields=items(_id),count');
        const json = await response.json();
        this.setState({
            ...this.getState(),
            pagesQuantity: Math.ceil(json.result.count/10)
        }, `Общее количество страниц ${Math.ceil(json.result.count/10)}`);
    }

    changePage(page) {
        this.setState({
            ...this.getState(),
            currentPage: Number(page)
        })
    }

}

export default Pages