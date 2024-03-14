import StoreModule from "../module";
class Language extends StoreModule {
  initState() {
    const langActive = localStorage.getItem("lang");

    return {
      lang: "ru",
      valueLang: langActive ? JSON.parse(langActive) : null,
    };
  }

  changeLang() {
    const currentLang = this.getState().lang;
    const currentValue = this.getState().valueLang;
    const newLang = currentLang === "ru" ? "en" : "ru";
    this.setState({
      ...this.getState(),
      lang: newLang,
      valueLang: !currentValue,
    });
    localStorage.setItem("lang", JSON.stringify(!currentValue));
  }
}

export default Language;
