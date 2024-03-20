import StoreModule from "../module";

class CategoryState extends StoreModule {
  initState() {
    return {      
      waiting: false,
      list: []
    };
  }

  async initCategory() {
    try {
      this.setState({
        ...this.getState(),        
        waiting: true
      }, 'Запрос списка категорий из АПИ');

      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const data = await response.json();

      this.setState({
        ...this.getState(),
        list: data.result.items,
        waiting: false
      }, 'Загружен список категорий из АПИ');

    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }
}

export default CategoryState;