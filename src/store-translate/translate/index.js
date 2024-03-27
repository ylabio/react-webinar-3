import TranslateModule from '../module';

class TranslateState extends TranslateModule {

  initState() {
    return {
      language: 'ru'
    }
  }

  changeLanguage(language) {
    this.setState({
      ...this.getState(),
      language: language
    });
  }
}

export default TranslateState;