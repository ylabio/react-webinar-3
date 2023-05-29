import StoreModule from '../module';

class Lang extends StoreModule {
    constructor(store, name) {
        super(store, name);
    }

    initState() {
        return {
            lang: 'ru'
        }
    }

    setLang(lang) {
        this.setState({
            ...this.getState(),
            lang
        }, `Выбран язык ${lang}`);
    }

    getLang() {
        return this.getState()
    }
}

export default Lang;