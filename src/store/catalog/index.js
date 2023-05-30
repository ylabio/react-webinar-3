import { codeGenerator } from '../../utils'
import StoreModule from '../module'

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name)
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      limit: 10,
      count: 0,
    }
  }

  async loadList() {
    const response = await fetch('/api/v1/articles')
    const json = await response.json()

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ'
    )
  }

  async loadCount() {
    const response = await fetch(
      `api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count`
    )
    const json = await response.json()

    this.setState(
      {
        ...this.getState(),
        count: json.result.count,
      },
      'Загружены товары из АПИ'
    )
  }

  async loadPage(limit, page) {
    console.log(this.store)
    const skip = page * limit - limit

    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`)

    const json = await response.json()
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ'
    )
  }

  onChangePage(numPage) {
    this.setState(
      {
        ...this.getState(),
        currentPage: numPage,
      },
      `Номер страницы ${numPage}`
    )
  }

  onChangeLimit(limit) {
    this.setState(
      {
        ...this.getState(),
        limit: limit,
      },
      `Установлен лимит ${limit}`
    )
  }
}

export default Catalog
