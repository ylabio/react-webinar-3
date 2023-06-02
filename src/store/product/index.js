import StoreModule from "../module";

class Product extends StoreModule {

    constructor(store, name) {
		super(store, name);
	}

    initState() {
        return {
            item: {},
        }
    }

    async load(id) {
        const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        this.setState({
            ...this.getState(),
            item: json.result
        }, 'Загружена информация о товаре с id ' + id);
    }
}

export default Product;