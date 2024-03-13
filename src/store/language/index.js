import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: "ru"
    }
  }

  change(lang){
    this.setState({
        ...this.getState(),
        language: lang,
    })
  }

}

export default Language;