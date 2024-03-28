import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import CommentsLayout from "../../components/comments-layout";
import useTranslate from '../../hooks/use-translate';
import commentsActions from '../../store-redux/comments/actions'
import { useDispatch, useStore } from "react-redux";
import { useSelector as selectorRedux } from "react-redux";
import useSelector from "../../hooks/use-selector";
import Comment from "../../components/comment";
import listToTree from "../../utils/list-to-tree";
import { useState, useCallback, useMemo, memo } from "react";
import CommentInput from "../../components/comment-input";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";


function Comments({ id }) {
  const store = useStore();

  const dispatch = useDispatch();

  const { t } = useTranslate();

  const inputRef = useRef();

  const [answerTo, setAnswerTo] = useState({
    _id: id,
    _type: 'article'
  });

  useEffect(() => {
    if(inputRef.current && answerTo._type != 'article'){
      inputRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [answerTo])

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
      if (text.trim().length > 0) {
        console.log(answerTo);
        await dispatch(commentsActions.send(text, answerTo));
        setAnswerTo({ _id: id, _type: 'article' });
      }
    }, [store, answerTo]),
    onAnswer: useCallback((commentId) => setAnswerTo({ _id: commentId, _type: 'comment' })),
    onCancel: useCallback(() => setAnswerTo({ _id: id, _type: 'article' }))
  };

  const commentInput = useMemo(() => {
    return (
      <CommentInput isLoggedIn={select.exists} redirect='/login' t={t}
        onCancel={callbacks.onCancel} parent={answerTo._type} onSend={(text) => callbacks.onSend(text)} inputRef={inputRef}/>
    )
  }, [answerTo, select.exists, selectRedux.comments, t])

  const comments = useMemo(() => {
    return listToTree(selectRedux.comments)[0]?.children.map(comment => (
      <Comment key={comment._id} t={t} item={comment} currentUser={select.user}
        answerTo={answerTo} onAnswer={callbacks.onAnswer} input={commentInput} />
    ))
  }, [selectRedux.comments, answerTo, t, select.exists]);


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