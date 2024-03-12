import StoreModule from "../module";
import eng from '../../lang/en.json'
import ru from '../../lang/ru.json'

class Language extends StoreModule {

  initState() {
    return {
      lang: "ru-RU",
      texts: ru
    }
  }

  changeLanguage(lang){
    // const response = await fetch(`../../lang/${lang}.json`);
    // const json = await response.json();
    // console.log(response);
    // console.log(json);
    this.setState({
      ...this.getState(),
      texts: lang == "ru-RU" ? ru : eng
    }, `смена языка на ${lang}`)
  }
}

export default Language;