import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      language: 'ru',
    };
  }



  languageRu() {
    this.setState(
        {
          ...this.getState(),
          language: 'ru',
        },
      );
  }


  languageEn() {
    this.setState(
        {
          ...this.getState(),
          language: 'en',
        },
      );


  }

 
}

export default Language;