import StoreModule from "../module";

class I18n extends StoreModule {

	initState() {
		const locales = this.loadLocaleFiles();
		return {
			allLocales: locales,
			lang: 'ru',
			locale: locales['ru']
		}
	}

	loadLocaleFiles() {
		const locales = {};
		const files = this.importAll(require.context('../../locales', false, /\.json$/));
		files.forEach(file => {
			locales[file.locale] = file.translations;
		});
		return locales;
	}

	importAll(context) {
		let files = {};
		context.keys().forEach((filename) => {
			const locale = filename.replace('./', '').replace('.json', '');
			files[locale] = context(filename);
		});
		return Object.keys(files).map(key => ({
			locale: key,
			translations: files[key]
		}));
	};

	changeLocale(newLocale) {
		this.setState({
			...this.getState(),
			lang: newLocale,
			locale: this.getState().allLocales[newLocale]
		}, 'Сменен язык');
	};
}

export default I18n;
