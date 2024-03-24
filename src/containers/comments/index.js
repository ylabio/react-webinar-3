import { memo } from "react";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import CommentsLayout from "../../components/comments-layout";
import shallowEqual from "shallowequal";
import commentsActions from '../../store-redux/comments/actions'
import { useDispatch } from "react-redux";
import { useSelector as selectorRedux } from "react-redux";
import useSelector from "../../hooks/use-selector";
import Comment from "../../components/comment";
import { useEffect } from "react";
import { useMemo } from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import { useState } from "react";
import { useCallback } from "react";
import CommentInput from "../../components/comment-input";
import { useDeferredValue } from "react";


function Comments({ id }) {
  const store = useStore();
  const dispatch = useDispatch();
  const [answerTo, setAnswerTo] = useState({
    _id: id,
    _type: 'article'
  });

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  const select = useSelector(state => ({
    token: state.session.token,
    exists: state.session.exists
  }));

  const selectRedux = selectorRedux(state => ({
    comments: state.comments.list,
    count: state.comments.count,
    waiting: state.comments.waiting,
  }))

  const callbacks = {
    onSend: useCallback((text) => {
      dispatch(commentsActions.send(text,answerTo,select.token));
      dispatch(commentsActions.load(id));
    }),
    onAnswer: useCallback((commentId) => setAnswerTo({ _id: commentId, _type: 'comment' })),
    onCancel: useCallback(() => setAnswerTo({ _id: id, _type: 'article' }))
  };

  const commentInput = useMemo(() => {
    return (
      <CommentInput isLoggedIn={select.exists} redirect='/login' onCancel={callbacks.onCancel} parent={answerTo._type} />
    )
  }, [answerTo, select.exists, selectRedux.comments])

  const comments = useMemo(() =>
    treeToList(listToTree(selectRedux.comments), (item, level) => {
      return (
        <>
          {level > 0 ? <Comment key={item._id} item={item} level={level - 1}
            currentUser={select.user} onAnswer={callbacks.onAnswer}
            children={(answerTo._id == item._id && answerTo._type == 'comment') && commentInput} /> : ''}
        </>
      )
    }), [selectRedux.comments, answerTo, select.exists]
  );

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsLayout count={selectRedux.count}>
        {comments}
        {(answerTo._id == id && answerTo._type == 'article') && commentInput}
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments);