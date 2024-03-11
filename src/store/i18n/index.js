import StoreModule from "../module";
import { languageNames } from "./config";

const DEFAULT_LANG = 'ru';

class I18n extends StoreModule {

	initState() {
		return {
			languageNames,
			lang: DEFAULT_LANG,
			locale: this.loadLocaleFile(DEFAULT_LANG)
		}
	}

	loadLocaleFile(lang) {
		return require(`../../locales/${lang}.json`);
	}

	changeLocale(lang) {
		this.setState({
			...this.getState(),
			lang,
			locale: this.loadLocaleFile(lang)
		}, 'Сменен язык');
	};
}

export default I18n;
