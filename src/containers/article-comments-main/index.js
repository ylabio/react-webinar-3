import {memo, useCallback, useMemo, useLayoutEffect, useEffect, useState} from 'react';
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
import useInit from '../../hooks/use-init';

function ArticleCommentsMain() {
  const store = useStore();

  const [pageRefresh,setPageRefresh] = useState(false);
  const [vY,setY] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const selectRedux = useSelector(state => ({
    articleComments: state.articleComments.data.items,
    count: state.articleComments.data.count,
    waiting: state.articleComments.waiting,
    _id: state.article.data._id,
  }), shallowequal);

  const select = useSelectorForStore(state => ({
    user: state.session.user.profile?.name,
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
    user: useMemo(() => select.user, [select.user]),
    waiting: useMemo(() => selectRedux.waiting, [selectRedux.waiting]),
  };

  const fScrollY = () => {
    let cordsAfterClick = [];
    let cords = ["scrollX", "scrollY"];
    cords.forEach((cord) => {
      cordsAfterClick.push(window[cord]);
    });
    return cordsAfterClick[1];
  };

  const fComment = (data) => {
      dispatch(articleCommentActions.load(data));
      //dispatch(articleActions.load(options._id));
      //dispatch(articleCommentsActions.load(options._id));
      //dispatch(articleCommentsActions.fScrollY(fScrollY()));
      //navigate(location.pathname);
      setY(fScrollY());
      setPageRefresh(true);
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
    onLogin: useCallback(() => {
      dispatch(articleCommentsActions.login(true,selectRedux._id));
      //window.localStorage.setItem('ScrollY',fScrollY().toString())
    }, [selectRedux._id]),
  }

  useEffect(() => {
    if (pageRefresh == true) {
      setPageRefresh(false);
    async function fLoad() {
      await Promise.all([
        dispatch(articleCommentsActions.load(options._id)),
        setTimeout(() => {
          window.scrollTo(0, vY);
        }, 4000)
      ]);
    }
    fLoad();
    }
  }, [options.waiting,options._id, options.scrollY,pageRefresh])

  /*useLayoutEffect(() => {
    if (selectRedux.waiting == false) {
    let vScrollY = 0;
    const vStrScrollY = window.localStorage.getItem('ScrollY');
    if (!vStrScrollY) {
      vScrollY = selectRedux.scrollY;
    }
    else {
      vScrollY = Number(vStrScrollY);
      dispatch(articleCommentsActions.fScrollY(vScrollY));
      //window.localStorage.removeItem('ScrollY');
    }
    if (vScrollY) window.scrollTo(0, vScrollY);
    }
    else {
      //window.localStorage.removeItem('ScrollY');
    }
  }, [selectRedux.waiting, selectRedux.scrollY,location.pathname])*/

  return (
        (options.waiting == false ?
        <ArticleCardComments articleComments={options.articleComments}
                             autorization={options.exists}
                             user={options.user}
                             count={options.count}
                             onAnswer={callbacks.onAnswer}
                             onComment={callbacks.onComment}
                             onLogin={callbacks.onLogin}
                             t={t}/>
        : ''
        )
  );
}

export default memo(ArticleCommentsMain);
