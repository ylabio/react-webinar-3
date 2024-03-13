import StoreModule from "../module";
import lang from '../../lang.json';

class MultiLingua extends StoreModule {

  initState() {
    return {
      Language: 'null',
      vLang: null,
    }
  }
  
  setVariable(language) {
    let vLang = this.getState().vLang;
    let exist = false;
      if(language == lang.ru.Language) {
        vLang = lang.ru;
        exist = true;
      }
      if(language == lang.en.Language) {
        vLang = lang.en;
        exist = true;
      }
      if(language == lang.de.Language) {
        vLang = lang.de;
        exist = true;
      }
      if(language == lang.cn.Language) {
        vLang = lang.cn;
        exist = true;
      }
    if (exist == false) return;
    this.setState({
      ...this.getState(),
      Language: language,
      vLang: vLang,
    }, 'Устанавлиаем переменные языка');
  }
}

export default MultiLingua;
