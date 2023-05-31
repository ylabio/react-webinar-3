import StoreModule from "../module";
import langPack from '../../assets/mock-data/mock-lang-pack.json';

class Lang extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      lang: 'en',
      lPack: {...langPack['en']},
    }
  }

  changeLang(newLang) {
    if (Object.keys(langPack).includes(newLang)) {

      this.setState({
        ...this.getState(),
        lang: newLang,
        lPack: {...langPack[newLang]}
     }, 'Changing app lang');

    }
  }

  getPhrase(phraseGroup, phraseCode, phraseDefault) {
    const phrase = this.getState().lPack[phraseGroup][phraseCode];
    return phrase || phraseDefault;
  }
}

export default Lang;
