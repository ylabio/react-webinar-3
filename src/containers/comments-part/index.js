import { memo, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import findLastChild from "../../utils/find-last-child";
import getNormalComment from "../../utils/get-normal-comment";
import Item from "../../components/item";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import Comment from '../../components/comment';
import CommentForm from '../../components/comment-form';
import CommentsCount from "../../components/comments-count";

import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import comment from "../../components/comment";



function Comments() {
  const store = useStore();

  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    userId: state.session.user._id,
    exists: state.session.exists
  }));

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    waiting: state.comments.waiting,
    answerId: state.comments.answerId,
    count: state.comments.count,
  }));

  const callbacks = {
    setAnswerId: useCallback((id) => {
      dispatch(commentsActions.setAnswerId(id));
    }, [commentsActions]),

    onEnter: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    onSubmit: useCallback((event, answerId, paramId, text) => {
      event.preventDefault()

      if (text && text.trim().length) {
        dispatch(commentsActions.send(answerId, paramId, text))
      }
    }, []),
  }

  const multilang = useTranslate();

  const { t } = multilang;

  console.log(selectRedux.comments)

  const options = {
    comments: useMemo(() => (
      treeToList(listToTree(selectRedux.comments, "_id", "_type"), getNormalComment)
    ), [selectRedux.comments]),
  };

  let answeredComment = useMemo(() => (
    options.comments.find(item => item._id === selectRedux.answerId)
  ), [selectRedux.comments, selectRedux.answerId])


  let idOfLastChild = useMemo(() => (
    findLastChild(answeredComment)
  ), [answeredComment])

  let formPadding = useMemo(() => (
    40 + (answeredComment?.level < 9 ? 30 * (answeredComment.level + 1) : 30 * 9)
  ), [answeredComment])


  const renders = {
    item: useCallback((item, i, array) => {

      return (
        <div key={item._id}>

          <Comment
            {...item}
            t={t}
            userId={select.userId}
            setAnswerId={callbacks.setAnswerId} />

          {
            (selectRedux.answerId !== params.id && idOfLastChild === item._id) && (
              <CommentForm t={t}
                answerId={selectRedux.answerId}
                padding={formPadding}
                exists={select.exists}
                paramsId={params.id}
                setAnswerId={callbacks.setAnswerId}
                onEnter={callbacks.onEnter}
                onSubmit={callbacks.onSubmit} />
            )
          }

        </div>
      )
    }, [multilang, select.userId, selectRedux.answerId, select.exists, params.id, callbacks.setAnswerId]),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsCount count={selectRedux.count} t={t} />

      <List list={options.comments} renderItem={renders.item} needWrapping={false} />

      {selectRedux.answerId === params.id && (
        <CommentForm t={t}
          answerId={selectRedux.answerId}
          padding={40}
          exists={select.exists}
          paramsId={params.id}
          onEnter={callbacks.onEnter}
          onSubmit={callbacks.onSubmit} />
      )}
    </Spinner>
  );
}

export default memo(Comments);