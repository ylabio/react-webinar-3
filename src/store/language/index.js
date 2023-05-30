import StoreModule from "../module";

class Language extends StoreModule {
   initState() {
      return {
        language: 'ru',
      }
    }

   setLanguage(lang) {
      this.setState({
         language: lang
       }, `Выбран язык: ${lang}`,);
    }
}

export default Language