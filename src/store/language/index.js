import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      currentLanguage: document.documentElement.lang,
      languages: {
        ru: 'Русский',
        en: 'English'
      }
    }
  }

  async setLanguage(languageName) {
    document.documentElement.setAttribute('lang', languageName)
    this.setState({...this.getState(), currentLanguage: languageName} );

    const translateBasketList = async () => {
      await this.store.actions.basket.translateList(this.store.state.basket.list, languageName)
    }

    await translateBasketList()
  }
}

export default Language;
