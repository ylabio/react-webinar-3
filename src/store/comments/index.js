import StoreModule from '../module';


class Comments extends StoreModule{

    initState() {
        return {
          count:0
        }
      }

    async load(){
        const res = await this.services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=65f8322cf3360f03347a6be8`
          });
        console.log(res.data.result.count);
        this.setState({
            ...this.getState(),
            count:res.data.result.count
        })

        console.log(res);
    }

}

export default Comments;