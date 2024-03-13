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
			currentPage: 1,
			totalCount: 0,
			pageSize: 10,
			isLoading: false
    }
  }

  async loadCatalog(currentPage) {
		const skipPage = currentPage === 1 ? 0 : (currentPage - 1) * 10;

		this.setState({
			...this.getState(),
			isLoading: true,
			currentPage: currentPage
		})

		try {
			const response = await fetch(`/api/v1/articles?limit=${this.getState().pageSize}&skip=${skipPage}&fields=items(_id, title, price),count`);
      const json = await response.json();

			this.setState({
				...this.getState(),
				list: json.result.items,
				totalCount: json.result.count,
				isLoading: false,
				currentPage: currentPage
			}, 'Загружены товары из АПИ');
		} catch (e) {
				console.log(e)
				this.setState({
					...this.getState(),
					list: []
				});
		}
  }
}

export default Catalog;
