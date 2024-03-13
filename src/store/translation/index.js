import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class translation extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      language: 'ru',
    };
  }
  setLanguage(language) {
    localStorage.setItem('language', language);
    this.setState(
      {
        ...this.getState(),
        language: language,
      },
      'Изменение языка',
    );
  }
}

export default translation;
