import StoreModule from '../module';


class CommentsState extends StoreModule {

  initState() {
    return {
      text: {},
      waiting: false // признак ожидания загрузки
    }
  }

  async addComment(text, _id) {
    this.setState({
      text: {},
      waiting: true
    });

    try {
      const resp = await this.services.api.request({
        url: `api/v1/comments`,
        method: 'POST',
        body: JSON.stringify({
          "text": text,
          "parent": {"_id": `${_id}`, "_type": "article"}
        })
      });
      this.setState({
        text: resp.data.result.text,
        waiting: false
      }, 'Загружен товар из АПИ');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  async addAnswer(text, _id) {
    this.setState({
      text: {},
      waiting: true
    });

    try {
      const resp = await this.services.api.request({
        url: `api/v1/comments`,
        method: 'POST',
        body: JSON.stringify({
          "text": text,
          "parent": {"_id": `${_id}`, "_type": "comment"}
        })
      });
      this.setState({
        text: resp.data.result.text,
        waiting: false
      }, 'Загружен товар из АПИ');
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  }
}

export default CommentsState;
