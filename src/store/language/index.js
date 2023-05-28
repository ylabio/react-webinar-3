import StoreModule from '../module';
import translations from './translations.json';

class Language extends StoreModule {

  initState() {
    return {
      code: 'ru',
      codes: ['ru', 'en']
    }
  }


    /**
   * Изменение языка
   * @param code {String} - код языка
   */
  switch(code){
    const codes = this.getState().codes;
    if (!codes.includes(code) || code === this.getState().code) {
      return;
    }
    this.setState({codes, code}, `Установлен язык ${code}`);
  }

  /**
 * Возвращает локализованный текст
 * @param keyword {String} - ключ для поиска соответствующей локали
 * @return {String}
 */
  translate(keyword) {
    const words = translations.langs[this.getState().code];
    if (!words)
      return '';
    return words[keyword];
  }
}

export default Language;

