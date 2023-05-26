import { codeGenerator } from "../../utils"
import StoreModule from "../module"

class Catalog extends StoreModule {
	constructor(store, name) {
		super(store, name)
		this.generateCode = codeGenerator(0)
	}

	initState() {
		return {
			list: [],
			currentPage: 1,
			totalPages: 0,
			item: null
		}
	}

	/**
	 * Загрузка списка товаров с пагинацией
	 */
	async load() {
		const response = await fetch(
			`/api/v1/articles?limit=10&skip=${
				this.getState().currentPage * 10 - 10
			}&fields=items(_id, title, price),count`
		)
		const json = await response.json()
		this.setState(
			{
				...this.getState(),
				list: json.result.items,
				totalPages: Math.floor(json.result.count / 10),
			},
			"Загружены товары из АПИ"
		)
	}

	/**
	 * Изменение текущей страницы
	 */
	changePage(page) {
		this.setState(
			{
				...this.getState(),
				currentPage: page,
			},
			"Изменение страницы"
		)
	}

	async selectItem(id) {
		const response = await fetch(
			`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
		const json = await response.json()
		this.setState({
			...this.getState(),
			item: json.result
		},
		"Получение товара")
	}
}

export default Catalog
