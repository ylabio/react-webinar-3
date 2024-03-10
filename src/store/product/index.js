import StoreModule from "../module";

class Product extends StoreModule {

	initState() {
		return {};
	}

	async loadItem(id) {
		const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
		const json = await response.json();

		this.setState(json.result, 'Загружена информация о товаре из АПИ');
	}

	clear() {
		this.setState({title: 'Магазин'}, 'Очистка')
	}
}

export default Product;
