import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      currentLanguage: 'rus',
    }
  }

  toggleLanguage() {
    this.setState({
      ...this.getState(),
      currentLanguage: this.getState().currentLanguage === 'rus' ? 'eng' : 'rus',
    }, 'Язык приложения изменен')
  }
}
export default Language;