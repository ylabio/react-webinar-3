import StoreModule from "../module";
import { sortCategories } from "../../utils";

class Categories extends StoreModule {

    initState() {
        return {
            categories: [],
        };
    }

    async loadCategories() {
        const response = await fetch(`/api/v1/categories?fields=*&limit=*`);
        const result = await response.json();
        const remakeCategories = sortCategories(result.result.items).map((el) => ({
            title: el.prefix + el.title,
            value: el._id,
        }));

        const categories = [
            { title: "Все", value: "" },
            ...remakeCategories,
        ];

        this.setState(
            {
                ...this.getState(),
                categories: categories,
            },
            "Загружены категории"
        );
    }
}

export default Categories;
