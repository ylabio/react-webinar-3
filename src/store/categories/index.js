import StoreModule from "../module";
import { category } from "../../utils";


class Categories extends StoreModule{

    initState() {
        return {
            categoryList:[],
        }
      }
    
    async loadCategories(){
        const categoryRes = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        const categoryJson = await categoryRes.json()


        this.setState({
            ...this.getState(),
            categoryList:[{value:'all',title:'Все'},...category(categoryJson.result.items)]
          }, 'Загружен список категорий');
    }  

}

export default Categories;