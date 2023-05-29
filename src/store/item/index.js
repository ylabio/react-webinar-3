import StoreModule from '../module';

class Item extends StoreModule {
    constructor(store, name) {
        super(store, name);
    }

    initState() {
        return {
            loading: false,
            data: {
                description: '',
                madeIn: {
                    title: ''
                },
                category: {
                    title: ''
                },
                edition: 0,
                price: 0
            }
        }
    }

    async load(id) {
        this.setLoading()
        const json = await this.fetchItem(id)

        this.setState({
            ...this.getState(),
            data: {...json.result},
            loading: false
        }, 'Загружены товары из АПИ');
    }

    async fetchItem(id) {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();

        return json
    }

    setLoading() {
        this.setState({
            ...this.getState(),
            loading: true
        }, 'Загрузка');
    }
}

export default Item;