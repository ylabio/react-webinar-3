import { translation } from '../../locales';
import { getLanguage, i18n } from '../../utils';
import StoreModule from '../module';

class Settings extends StoreModule {
  initState() {
    return {
      language: getLanguage(),
      dictionary: Object.keys(translation),
    };
  }

  changeLanguage(language) {
    this.setState({ ...this.getState(), language }, 'Смена языка');
  }

  translate(key) {
    return i18n(this.getState().language, key);
  }
}

export default Settings;
