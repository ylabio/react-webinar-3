import StoreModule from '../module';

class Language extends StoreModule {
    initState() {
        return {
          language: 'ru',
        };
      }
    
      setLanguage(lang) {
        this.setState(
          {
            ...this.getState(),
            currentLanguage: lang,
          },
          `Язык изменен на: ${lang}`,
        );
      }
    }

export default Language;