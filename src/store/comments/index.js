import StoreModule from "../module";

class CommentsState extends StoreModule {

  initState() {
    return {
      list: [],
      count: 0,
      waiting: false
    }
  }

  async load(id){
    this.setState({...this.getState(), waiting: true}, 'Ожидание загрузки комментариев');

    const res = await this.services.api.request({
      url: `http://example.front.ylab.io/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
    });

    this.setState({
      ...this.getState(),
      list: res.data.result.items,
      count: res.data.result.count,
      waiting: false
    }, 'Комментарии загружены');
  }
}

export default CommentsState;