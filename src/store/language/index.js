import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      lang: 'ru'
    }
  }

  switch(lang) {
    this.setState({
      lang
    }, 'Переключили язык');
  }
}

export default Language;