import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ArticleState extends StoreModule {

  initState() {
    return {
      user: {},
      isAuth: false,
      error: null,
      waiting: false // признак ожидания загрузки
    }
  }

  async initAuth(){
    // для первоначальной проверки авторизации ПРОВЕРИТЬ ОДИН РАЗ ПРИ ПЕРВОМ РЕНДЕРЕ
  }

  
  async auth() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true
    });

    try {
      

    } catch (e) {
      
    }
  }
}

export default ArticleState;
