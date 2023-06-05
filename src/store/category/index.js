import StoreModule from '../module';

class CategoryState extends StoreModule {
    initState() {
        return {
            categoryItems: [],
            waiting: false
        }
    }

    async loadCategories() {
        this.setState({
            ...this.getState(),
            waiting: true
        }, 'Загрузка категорий');

        try {
            const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
            const json = await response.json();

            this.setState({
                ...this.getState(),
                categoryItems: json.result.items,
                waiting: false
            }, 'Загружен список товаров из АПИ');
        } catch (error) {
            this.setState({
                ...this.getState(),
                waiting: false
            }, 'Ошибка загрузки категорий');
        }
    }
}

export default CategoryState;