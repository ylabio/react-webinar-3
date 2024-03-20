import StoreModule from "../module";

class CategoriesState extends StoreModule {
    initState() {
        return {
            categories: [],
            activeCategory: null,
            loading: false,
            error: null
        };
    }

    async fetchCategories() {
        this.setState({ loading: true, error: null });
        try {
            const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
            if (!response.ok) {
                throw new Error('Сервер вернул ошибку при запросе категорий');
            }
            const data = await response.json();
            const categories = data.result.items || [];
            categories.unshift({ _id: null, title: 'Все' });
            this.setState({
                categories: categories,
                loading: false
            });
        } catch (error) {
            this.setState({ loading: false, error: error.message });
        }
    }

    setActiveCategory(categoryId) {
        this.setState({
            activeCategory: categoryId
        });
    }
}

export default CategoriesState;