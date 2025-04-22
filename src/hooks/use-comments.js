import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchComments, postComment } from '../store/comments';
import useTranslate from './use-translate';

export function useComments(productId) {
  const dispatch = useDispatch();
  const { lang } = useTranslate();

  const { items: flat, waiting } = useSelector(
    state => state.comments,
    shallowEqual
  );

  const [replyTo, setReplyTo] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId, lang]);

  const comments = useMemo(() => {
    const map = {};
    flat.forEach(c => { map[c.id] = { ...c, replies: [] }; });
    const roots = [];
    flat.forEach(c => {
      if (c.parent === productId) roots.push(map[c.id]);
      else if (map[c.parent]) map[c.parent].replies.push(map[c.id]);
    });
    return roots;
  }, [flat, productId]);

  const onReplyClick = useCallback(id => {
    setReplyTo(id);
    setText('');
  }, []);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(postComment({
      parentId: replyTo || productId,
      parentType: replyTo ? 'comment' : 'article',
      text: text.trim(),
    }));
    setReplyTo(null);
    setText('');
  }, [dispatch, replyTo, productId, text]);

  return { comments, waiting, replyTo, text, setText, onReplyClick, onSubmit };
}