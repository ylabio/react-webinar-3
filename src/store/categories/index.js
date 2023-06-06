import StoreModule from "../module";

class CategoriesState extends StoreModule {

        initState() {
          return {
            categories: [],
          }
        }
      
        async getCategories() {
      
          const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
          const data = await response.json();
          const categoriesResponse = data.result.items;
          this.setState({
            ...this.getState(),
            categories: categoriesResponse,
          }, 'Загружены категории');
        }
      }

export default CategoriesState;
