import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Lang extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      language: 'ru',
    };
  }

  async setLanguage({ lang }) {
    this.setState({ ...this.getState(), language: lang });
  }
}

export default Lang;
