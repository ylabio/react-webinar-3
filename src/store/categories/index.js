import StoreModule from "../module";

class CategoriesState extends StoreModule {

    initState() {
        return {
          categories: []
        }
      }

    async categoriesLoad() {
        const categoriesResponse = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
        const res = await categoriesResponse.json();
        this.setState({
            ...this.getState(),
            categories : res.result.items
        }, 'Получены категории из АПИ');
    }
}

export default CategoriesState;