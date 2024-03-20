import StoreModule from "../module";
import {codeGenerator} from "../../utils";

class CategoriesState extends StoreModule {

  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  async getCategories() {
    try {
      this.setState({
        ...this.getState(),
        waiting: true,
      }, 'Загрузка всех категорий')

      const res = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`)
      const json = await res.json()

      let categories = json.result.items

      this.setState({
        ...this.getState(),
        categories,
        waiting: false
      }, 'Категории получены из АПИ')
    } catch (e) {
      console.error(e)
      this.setState({
        ...this.getState(),
        waiting: false
      }, 'Ошибка загрузки категорий')
    }
  }
}

export default CategoriesState;