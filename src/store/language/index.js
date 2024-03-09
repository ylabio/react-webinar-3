import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      language: "ru",
    };
  }

  setLanguage(lang) {
    this.setState({
      language: lang,
    });
  }
}

export default Language;
