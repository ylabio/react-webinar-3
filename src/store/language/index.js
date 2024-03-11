import StoreModule from "../module";

class Language extends StoreModule {
  initState() {
    return {
      lang: "ru",
      valueLang: true,
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
  }
}

export default Language;
