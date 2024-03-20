import StoreModule from "../module";
import { category } from "../../utils";


class Categories extends StoreModule{

    initState() {
        return {
            categoryList:[{value:'all',title:'Все'}],
        }
      }

    async loadCategories(){
        const categoryRes = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)`);
        const categoryJson = await categoryRes.json()

        this.setState({
            ...this.getState(),
            categoryList:[...category(categoryJson.result.items)]
          }, 'Загружен список категорий');
    }  

}

export default Categories;