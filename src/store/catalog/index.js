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
			count: 0,
			limit: 0,
			skip: 0,
			limitPage: 0
		}
	}
	
	async load() {
		const limit = 125;
		const skip = 0;
		const limitPage = 10;
		
		const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
		const json = await response.json();
		this.setState({
			...this.getState(),
			list: json.result.items,
			count: json.result.count,
			limit: limit,
			skip: skip,
			limitPage: limitPage,
		}, 'Загружены товары из АПИ');
	}
}

export default Catalog;
