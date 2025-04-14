import StoreModule from '../module';

/**
 * Состояние списка категорий
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false,
      error: null
    };
  }

  /**
   * Загрузка списка категорий товаров
   * @returns {Promise<void>}
   */
  async loadCategoryList() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null
    })

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message)
      }

      this.setState({
        ...this.getState(),
        list: json.result.items,
        waiting: false
      },
      'Загружен список категорий из АПИ'
    )
    } catch (error) {
      this.setState({
        ...this.getState(),
          waiting: false,
          error: error.message
      })
    }
  }
}

export default CategoryState;
