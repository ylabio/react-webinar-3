import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    // Проверяем, есть ли сохраненный язык в localStorage
    const savedLang = localStorage.getItem('lang');
    return {
      // Если есть, используем его, иначе используем 'ru' по умолчанию
      lang: savedLang ? savedLang : 'ru'
    }
  }

  switch(lang) {
    this.setState({
      lang
    }, 'Переключили язык');
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem('lang', lang);
  }
}

export default Language;