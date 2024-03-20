import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryState extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            categories: []
        };
    }

    /**
     * Загрузка категорий из API
     */
    async loadCategories() {
        this.setState({ waiting: true }, 'Загрузка категорий');

        try {
            const categoriesResponse = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
            const categoriesJson = await categoriesResponse.json();
            const categories = Array.isArray(categoriesJson.result.items) ? categoriesJson.result.items : [];

            categories.unshift({
                _id: null,
                title: 'Все',
            });

            this.setState({
                categories: categories.map(cat => ({
                    value: cat._id,
                    title: cat.title,
                    parent: cat.parent ? cat.parent._id : null
                })),
                waiting: false
            }, 'Загружен список категорий');
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
            this.setState({ waiting: false });
        }
    }
}

export default CategoryState;