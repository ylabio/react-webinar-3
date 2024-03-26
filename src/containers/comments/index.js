import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import CommentsLayout from "../../components/comments-layout";
import useTranslate from '../../hooks/use-translate';
import commentsActions from '../../store-redux/comments/actions'
import { useDispatch } from "react-redux";
import { useSelector as selectorRedux } from "react-redux";
import useSelector from "../../hooks/use-selector";
import Comment from "../../components/comment";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import { useState, useCallback, useMemo, memo } from "react";
import CommentInput from "../../components/comment-input";


function Comments({ id }) {
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const [answerTo, setAnswerTo] = useState({
    _id: id,
    _type: 'article'
  });

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }));

  const selectRedux = selectorRedux(state => ({
    comments: state.comments.list,
    count: state.comments.count,
    waiting: state.comments.waiting,
  }))

  const callbacks = {
    onSend: useCallback(async (text) => {
      if (text.length > 0) {
        await dispatch(commentsActions.send(text, answerTo));
        dispatch(commentsActions.load(id));
      }
    }),
    onAnswer: useCallback((commentId) => setAnswerTo({ _id: commentId, _type: 'comment' })),
    onCancel: useCallback(() => setAnswerTo({ _id: id, _type: 'article' }))
  };

  const commentInput = useMemo(() => {
    return (
      <CommentInput isLoggedIn={select.exists} redirect='/login' t={t}
        onCancel={callbacks.onCancel} parent={answerTo._type} onSend={(text) => callbacks.onSend(text)} />
    )
  }, [answerTo, select.exists, selectRedux.comments, t])

  const comments = useMemo(() =>
    treeToList(listToTree(selectRedux.comments), (item, level) => {
      return (
        <>
          {level > 0 ? <Comment key={item._id} item={item} level={level - 1}
            currentUser={select.user} onAnswer={callbacks.onAnswer} t={t}
            children={(answerTo._id == item._id && answerTo._type == 'comment') && commentInput} /> : ''}
        </>
      )
    }), [selectRedux.comments, answerTo, select.exists, t]
  );

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsLayout count={selectRedux.count} t={t}>
        {comments}
        {(answerTo._id == id && answerTo._type == 'article') && commentInput}
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments);