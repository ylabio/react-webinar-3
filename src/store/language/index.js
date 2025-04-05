import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      lang: 'ru',
    };
  }

  changeLanguage(language) {
    this.setState(
      {
        ...this.getState(),
        lang: language,
      },
    );
  }
}

export default Language;