import StoreModule from "../module";

class Intl extends StoreModule {
  initState() {
    return {
      defaultLocale: "en",
      currentLocale: null,
      resourse: null,
      resourseIsLoading: false,
    };
  }

  setCurrentLocale(locale) {
    this.setState({
      ...this.getState(),
      currentLocale: locale,
    });
  }

  async loadLocaleResourse(locale) {
    this.setState({
      ...this.getState(),
      resourseIsLoading: true,
    });

    const resourse = await Promise.resolve(
      import(`../../locales/${locale}/index.json`)
    );

    this.setState({
      ...this.getState(),
      resourse: resourse,
      resourseIsLoading: false,
    });
  }
}

export default Intl;
