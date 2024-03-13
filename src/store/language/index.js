import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
		const currentLang = localStorage.getItem('language');
    return {
      language: currentLang ? currentLang : "ru",
    };
  }

  setLanguage(lang) {
		localStorage.setItem('language', lang);
    this.setState({
			...this.getState(),
      language: lang,
    }, "Изменен язык");
  }
}

export default Language;