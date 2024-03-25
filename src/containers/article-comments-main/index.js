import {memo, useCallback, useMemo, useLayoutEffect} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import ArticleCardComments from '../../components/article-card-comments';
import useSelectorForStore from '../../hooks/use-selector';
import {useDispatch,useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import articleCommentActions from '../../store-redux/article-comment/actions';
import articleCommentsActions from '../../store-redux/article-comments/actions';
import articleActions from '../../store-redux/article/actions';
import {useLocation, useNavigate} from 'react-router-dom';

function ArticleCommentsMain() {
  const store = useStore();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const selectRedux = useSelector(state => ({
    articleComments: state.articleComments.data.items,
    count: state.articleComments.data.count,
    waiting: state.articleComments.waiting,
    _id: state.article.data._id,
    scrollY: state.articleComments.scrollY,
  }), shallowequal);

  const select = useSelectorForStore(state => ({
    exists: state.session.exists,
  })); 

  const {t} = useTranslate();

  const options = {
    articleComments: useMemo(() => ([
      ...treeToList(listToTree(selectRedux.articleComments), (item, level) => (
        {_id: item._id,
         text: item.text,
         dateCreate: item.dateCreate,
         author: item.author?.profile?.name,
         isDeleted: item.isDeleted,
         level: level
        }
      ))
    ]), [selectRedux.articleComments]),

    count: useMemo(() => selectRedux.count, [selectRedux.count]),
    exists: useMemo(() => select.exists, [select.exists]),
    _id: useMemo(() => selectRedux._id, [selectRedux._id]),
  };

  const fComment = (data) => {
      let cordsAfterClick = [];
      let cords = ["scrollX", "scrollY"];
      cords.forEach((cord) => {
        cordsAfterClick.push(window[cord]);
      });
      dispatch(articleCommentActions.load(data));
      dispatch(articleActions.load(options._id));
      dispatch(articleCommentsActions.load(options._id,cordsAfterClick[1]));
      navigate(location.pathname);
  }

  const callbacks = {
    onComment: useCallback((Comment) => {
      const data = {
        text: Comment,
        parent: {_id:  options._id, _type:  "article"}
      };
      fComment(data);
    }, [options._id]),
    onAnswer: useCallback((Answer,_id) => {
      const data = {
        text: Answer,
        parent: {_id:  _id, _type:  "comment"}
      };
      fComment(data);
    }, [options._id]),
  }

  useLayoutEffect(() => {
    if (selectRedux.waiting == false) window.scrollTo(0, selectRedux.scrollY);
  }, [selectRedux.waiting, selectRedux.scrollY])

  return (
        (selectRedux.waiting == false ?
        <ArticleCardComments articleComments={options.articleComments}
                             autorization={options.exists}
                             count={options.count}
                             onAnswer={callbacks.onAnswer}
                             onComment={callbacks.onComment}
                             t={t}/>
        : ''
        )
  );
}

export default memo(ArticleCommentsMain);
