import StoreModule from '../module';

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class CommentsState extends StoreModule {

  initState() {
    return {
      text: {},
      waiting: false // признак ожидания загрузки
    }
  }

  async addComment(text,_id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      text: {},
      waiting: true
    });
    const resp = await this.services.api.request({
      url: `api/v1/comments`,
      method: 'POST',
      headers: {
        'X-Token': this.services.store.state.session.token
      },
      body: JSON.stringify({
        "text": text,
        "parent": {"_id": `${_id}`, "_type": "article"}
      })
    });
    // Товар загружен успешно
    this.setState({
      text:resp.data.result.text,
      waiting: false
    }, 'Загружен товар из АПИ');
  }
  async addAnswer(text,_id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      text: {},
      waiting: true
    });
    const resp = await this.services.api.request({
      url: `api/v1/comments`,
      method: 'POST',
      headers: {
        'X-Token': this.services.store.state.session.token
      },
      body: JSON.stringify({
        "text": text,
        "parent": {"_id": `${_id}`, "_type": "comment"}
      })
    });
    // Товар загружен успешно
    this.setState({
      text:resp.data.result.text,
      waiting: false
    }, 'Загружен товар из АПИ');
  }
}

export default CommentsState;
