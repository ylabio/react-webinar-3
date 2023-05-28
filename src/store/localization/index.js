import StoreModule from "../module";
import json from './localizationData.json';

class Localization extends StoreModule {

  initState() {
    return {
      currentLanguage: "RU",
      list: json.list,
    }
  }

  toLocalization(text) {
    return json.languages[this.getState().currentLanguage][text];
  }
 
  onChangeLanguage(currentLanguage) {
    this.setState({
      ...this.getState(),
      currentLanguage,
    });
  }

 }

export default Localization;