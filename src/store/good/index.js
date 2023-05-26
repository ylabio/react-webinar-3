import StoreModule from "../module";

class Good extends StoreModule {

  initState() {
    return {
      details:  {
        title: null,
        description: null,
        madeInTitle: null,
        madeInCode: null,
        category: null, 
        edition: null,
        price: null,
      },
      isLoading: true,
      isError: false
    }
  }

  async load(id) {
    try {
      this.setState({
        ...this.getState(),
        details:  {
          title: 'Загрузка',
        },
        isLoading: true
      })
  
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
      const {result} = await response.json();
  
      this.setState({
        ...this.getState(),
        details: {
          title: result.title,
          description: result.description,
          madeInTitle: result.madeIn.title,
          madeInCode: result.madeIn.code,
          category: result.category.title,
          edition: result.edition,
          price: result.price 
        },
        isLoading: false,
        isError: false,
      })

    } catch (e) {

      this.setState({
        ...this.getState(),
        isLoading: false,
        isError: true
      })

      throw new Error('Bro....', e)
    }
  }

  reset() {
    this.setState({
      ...this.getState(),
      details: {
        description: null,
        madeInTitle: null,
        madeInCode: null,
        category: null, 
        edition: null,
        price: null,
      }
    })
  }

}

export default Good;