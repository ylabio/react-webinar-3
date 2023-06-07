import StoreModule from "../module";
import { displayCategories } from "../../utils";
/**
 * Состояние категорий
 */
class CategoriesState extends StoreModule {

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            categoryItems: []
        }
    }

    async getCategories() {
        const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
        const json = await response.json();
        this.setState({
            ...this.getState(),
            categoryItems: displayCategories(json.result.items)
        }, 'Загружы категории из АПИ');
    }
}

export default CategoriesState;