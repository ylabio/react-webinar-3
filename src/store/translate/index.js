import StoreModule from "../module";
import dataEng from "./../../translation-files/en.json";
import dataRu from "./../../translation-files/ru.json";
class Translate extends StoreModule {
  initState() {
    return {
      lang: localStorage.getItem("lang") || "RU",
      data:
        localStorage.getItem("lang") === "ENG"
          ? structuredClone(dataEng)
          : structuredClone(dataRu),
    };
  }

  setLang(lang = "RU") {
    localStorage.setItem("lang", lang);
    this.setState({
      ...this.getState(),
      lang,
      data: lang === "RU" ? { ...dataRu } : { ...dataEng },
    });
  }
}

export default Translate;
