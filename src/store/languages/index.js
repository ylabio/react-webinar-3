import StoreModule from "../module";
import LangDictionary from "./langDictionary";

class Languages extends StoreModule {
  initState() {
    let hash = window.location.hash;
    hash = hash.substring(1);
    return {
      name: hash,
    };
  }

  change(name) {
    this.setState({ name }, `Смена языка ${name}`);
    this.changeURLLanguage(name);
  }

  changeURLLanguage(name) {
    location.href = window.location.pathname + "#" + name;
    location.reload();
  }

  changeLanguage() {
    const select = document.querySelector(".Head-lang-select");
    const allLang = ["en", "ru"];
    let hash = window.location.hash;
    hash = hash.substring(1);
    if (!allLang.includes(hash)) {
      location.href = window.location.pathname + "#ru";
      location.reload();
    }
    select.value = hash;
    for (let key in LangDictionary) {
      let elem = document.getElementsByClassName("flag-" + key);
      if (elem) {
        // console.log(elem);
        for (let i = 0; i < elem.length; i++) {
          // console.log(elem[i]);
          elem[i].innerHTML = LangDictionary[key][hash];
        }
      }
    }
  }
}
export default Languages;
