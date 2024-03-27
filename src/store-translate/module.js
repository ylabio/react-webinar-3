class TranslateModule {

  /**
   * @param Translate {Translate}
   * @param name {String}
   * @param [config] {Object}
   */
  constructor(translate, name, config = {}) {
    this.translate = translate;
    this.name = name;
    this.config = config;
    this.services = translate.services;
  }

  initState() {
    return {}
  }

  getState() {
    return this.translate.getState()[this.name];
  }

  setState(newState, description = 'setState') {
    this.translate.setState({
      ...this.translate.getState(),
      [this.name]: newState
    }, description)
  }

}

export default TranslateModule;
