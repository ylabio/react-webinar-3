import StoreModule from '../module'

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name)
  }

  initState() {
    return {
      lang: 'en',
    }
  }

  onChangeLang(value) {
    console.log(value)
    this.setState({ ...this.getState(), lang: value })
  }
}

export default Language
