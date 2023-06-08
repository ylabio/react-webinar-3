import {REDUX_COMMENTS_ACTION_TYPE} from "./types";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  loadCommentList: (articleId) => {
    return async (dispatch, getState, services) => {

      dispatch({type: REDUX_COMMENTS_ACTION_TYPE.commentsLoadStart});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${articleId}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`
        });

        // const x = res.data.result.items.map(item => {
        //   if (item.parent._type === 'article') {
        //     return {...item, parent: null}
        //   }
        //   return item;
        // })
        //
        // const y = listToTree(x);
        //
        // const z = treeToList(y, (item, level) => ({
        //   _id: item._id,
        //   level,
        //   dateCreate: item.dateCreate,
        //   authorName: item.author.profile.name,
        //   text: item.text
        // }));

        // console.log('asdasd', JSON.stringify(z, null, 2));


        dispatch({type: REDUX_COMMENTS_ACTION_TYPE.commentsLoadSuccess, payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: REDUX_COMMENTS_ACTION_TYPE.commentsLoadError, payload: e?.message});
      }
    }
  },
}
