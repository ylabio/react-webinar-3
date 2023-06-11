import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentForm from "../../components/new-comment";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import CommentList from "../../components/comment-list";
import Comment from '../../components/comment';

const Comlen = ({id,comments,send}) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { exists, user } = useSelector(state => state.session);
  const baseComment = { id, parentId: null, text: 'Текст' };
  const [newComment, setNewComment] = useState({ ...baseComment });
  const list = useMemo(() => treeToList(
    listToTree([
      ...comments,
      {
        _type: 'editor',
        _id: null,
        text: newComment.text,
        parent: { _id: newComment.parentId || newComment.id }
      }
    ], id),
    (item, level) => ({ ...item, level })
  ), [comments, newComment]);
  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    onSubmit: useCallback(() => {
      send(newComment);
      setNewComment(comment => ({ ...comment, text: '' }));
    }, [newComment]),
    onChange: useCallback(text => setNewComment(comment => ({ ...comment, text })), []),
    onCancel: useCallback(() => setNewComment(baseComment), [baseComment]),
    onReply: useCallback(
      (parentId, name) => setNewComment(() => ({ ...baseComment, parentId, text: 'Мой ответ для ' + name })), []),
  }
  console.log('list:', list);
  useEffect(() => {
    if (!newComment.parentId)
      return;
    const nodeOffset = ref.current?.offsetTop;
    const innerHeight = window.innerHeight;
    window.scrollTo({ top: nodeOffset - innerHeight / 2, behavior: "smooth" });
  }, [newComment]);

  const renders = {
    comment: useCallback(comment => (
      <Comment
        key={comment._id}
        comment={comment}
        answer={callbacks.onReply}
        id={comment._id}
        user={{ name: comment.author?.profile?.name, _id: comment.author?._id }}
        level={comment.level <= 10 ? comment.level : 10}
        isUser={user?._id == comment.author?._id}
      />
    ), [user]),

    editor: useCallback(editor => (
      <CommentForm
        key={editor._id}
        reff={ref}
        level={editor.level <= 10 ? editor.level : 10}
        exists={exists}
        onSignIn={callbacks.onSignIn}
        isReply={newComment.parentId ? true : false}
        onCancel={callbacks.onCancel}
        send={callbacks.onSubmit}
        onChange={callbacks.onChange}
        text={editor.text}
      />
    ), [user, newComment])
  }

  return (
    <CommentList list={list} comment={renders.comment} editor={renders.editor}/>
  );
};

export default Comlen;