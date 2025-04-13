import StoreModule from "../module";
import { formatCategories } from "../../utils";

class Categories extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            categories: [], // Хранит все категории, полученные с Api
            waiting: false,
        };
    }

    async getCategories() {
        try {
            const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
            const data = await response.json();
            const formatedCategories = formatCategories(data.result.items);

            this.setState({
                ...this.getState(),
                categories: [{ value: '', title: 'Все' }, ...formatedCategories],
            }, 'Загружен список категорий')
        } catch (error) {
            console.log(error)
        }
    }
}

export default Categories;