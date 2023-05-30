import StoreModule from '../module'
import { langGenerator } from '../../utils'

class Lang extends StoreModule {
  initState() {
    return {
    homePageRu: langGenerator('ru', 'homePageLang'),
    homePageEn: langGenerator('en', 'homePageLang'),
    productPageRu: langGenerator('ru', 'productPageLang'),
    productPageEn: langGenerator('en', 'productPageLang'),
    basketPageRu: langGenerator('ru', 'basketPageLang'),
    basketPageEn: langGenerator('en', 'basketPageLang'),
    lang: 'ru'
    }
  }

  changeLang(nameLang) {
    this.setState({
        ...this.getState(),
        lang: nameLang,
      },`Изменение языка`)
  }
}

export default Lang
