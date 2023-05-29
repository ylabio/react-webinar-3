import StoreModule from "../module";

class Language extends StoreModule {
    initState() {
      return {
        language: 'ru'
      }
    }
  
  
    setLanguage(language) {
        this.setState({
          ...this.getState(),
          language
        });
      }
  }

  export default Language;
  