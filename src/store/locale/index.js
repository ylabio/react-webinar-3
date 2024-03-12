import StoreModule from "../module";
import { translations } from "../../locales";

class Locale extends StoreModule {

    initState() {
        return {
        lang : "ru",
        translations:translations["ru"]
        }
    }

    changeLang(_lang){
        this.setState({
            ...this.getState(),
            lang :_lang,
            translations : translations[_lang] || translations.ru
        }, 'Изменение языка');
    }

    getTranslation(language) {
        this.translations = translations[language] || translations.ru;
    }

}

export default Locale;
