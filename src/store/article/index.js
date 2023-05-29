import StoreModule from "../module";


class Article extends StoreModule {
    
    constructor(store, name) {
        super(store, name);
    }

    initState() {
        return {
            card: {
                _id: 0,
				title: "",
				description: "",
				madeIn: "",
				category: "",
				edition: 0,
				price: 0,
            }
        }
    }


    async loadArticleInfo(id) {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const data = await response.json();
        this.setState({
            ...this.getState(),
            card: {
                ...this.card,
                _id: data.result._id,
				title: data.result.title,
				description: data.result.description,
				madeIn: `${data.result.madeIn.title} ${data.result.madeIn.code} `,
				category: data.result.category.title,
				edition: data.result.edition,
				price: data.result.price,
            }
        })
    }
}

export default Article;