import StoreModule from "../module";
import { strings } from '../../vocabulary'

class Vocabulary extends StoreModule {  

  constructor(store, name) {
    super(store, name);
    this.vocabulary = strings
  }

  initState() {
    return {              
        language: 'ru'
    }
  }

  onChangeLanguage(language) {
    this.setState({
      ...this.getState(),
      language: language     
    }, 'Язык изменён');  
  }

  getTranslation(string, language) {    
    return this.vocabulary[language][string];
  };

}

export default Vocabulary;
