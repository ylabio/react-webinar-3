import StoreModule from "../module";

class CategoriesState extends StoreModule {
    initState(){
        return{
            list: []
        }
    }

    filterCategories(categories, parentId, nesting){
        const filtered = []
        categories.forEach((category) => {
          if((!category.parent && parentId === null) || (category.parent && category.parent._id === parentId)){
            filtered.push({
              ...category,
              title: "- ".repeat(nesting) + category.title
            })
            const childrenCategories = this.filterCategories(categories, category._id, nesting + 1)
            filtered.push(...childrenCategories)
          }
        })
        return filtered
      }
    
      async getCategories() {
        const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
        const data = await response.json();
        const categories = data.result.items;
        categories.forEach(category => category["value"] = category._id);
        const filteredCategories = this.filterCategories(categories, null, 0)
        
        filteredCategories.unshift({
          _id: "allCategoriesID",
          parent: null,
          title: "Все",
          value: "",
        })
    
        this.setState({
          ...this.getState(),
          list: filteredCategories,
        })
      }
}

export default CategoriesState