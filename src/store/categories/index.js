import StoreModule from "../module";
import {codeGenerator} from "../../utils";

class CategoriesState extends StoreModule {

  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  // buildTree(categories, parentId = null, level = 0) {
  //   const tree = []
  //   categories.forEach(category => {
  //     if ((category.parent && category.parent._id === parentId) || (parentId === null && category.parent === null)) {
  //       const subtree = this.buildTree(categories, category._id, level + 1)
  //       const node = { ...category }
  //       if (subtree.length > 0) node.subCats = subtree
  //       node.title = "-".repeat(level) + " " + node.title
  //       delete node.parent
  //       tree.push(node)
  //     }
  //   })
  //   return tree
  // }

  getCatOptions(categories) {
    const options = [{ title: 'Все', _id: '', value: '' }]

    const collectOptions = (cat, level = 0) => {
      if (!options.includes(cat)) {
        cat.title = level > 0 ? '-'.repeat(level) + ' ' + cat.title : cat.title
        cat.value = cat._id
        options.push(cat)
        const subs = categories.filter(c => c.parent?._id === cat._id)
        subs.forEach(sub => collectOptions(sub, level + 1))
      }
    }

    categories.forEach(cat => collectOptions(cat, 0))

    return options
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
      categories = this.getCatOptions(categories)

      this.setState({
        ...this.getState(),
        categories
      }, 'Категории получены из АПИ')
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      }, 'Загрузка категорий завершена')
    }
  }
}

export default CategoriesState;