import StoreModule from "../module";
import translation from "./translations.json";

class Translator extends StoreModule {
  initState() {
    return {
      type: {
        primary: "ru",
        secondary: ["en"],
      },
      language: "ru",
    };
  }

  langChange() {
    this.getState().language === "ru"
      ? this.setState({ language: "en" }, `Смена языка на английский`)
      : this.setState({ language: "ru" }, `Смена языка на русский`);
  }

  useTranslate() {
    return (text) => {
      const currentLang = this.getState().language;

      if (translation[currentLang][text]) {
        return translation[currentLang][text];
      }
    };
  }
}

export default Translator;
