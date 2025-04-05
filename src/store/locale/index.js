import StoreModule from '../module';

class Locale extends StoreModule {
    initState() {
        return {
            lang: 'ru',
        };
    }

    setLang(lang) {
        this.store.setState(
            {
                ...this.store.getState(),
                [this.name]: {
                    ...this.store.getState()[this.name],
                    lang,
                },
            },
            `Установлен язык: ${lang}`,
        );
    }
}

export default Locale;
