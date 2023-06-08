import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentEditor from '../../components/comments/editor';
import CommentItem from '../../components/comments/item';
import CommentList from '../../components/comments/list';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

/**
 * Компонент для комментариев.
 */

function Comments({ id, comments, send, remove }) {

  const navigate = useNavigate();
  const location = useLocation();
  const { exists, user } = useSelector(state => state.session);
  const { t } = useTranslate();
  const ref = useRef(null);

  //console.log('comments:', comments);

  // базовый коммент - заготовка
  const baseComment = { id, parentId: null, text: 'Текст' };

  // новый коммент на основе шаблона, тут накапливаем изменения
  const [newComment, setNewComment] = useState({ ...baseComment });

  // через пропатченный листТоТри формируем дерево, в колбэке treeToList добавляем свойство смещения →
  const list = useMemo(() => treeToList(
    listToTree([
      ...comments,
      // и в конец кладем редакторский итем
      {
        _type: 'editor',
        _id: null,
        text: newComment.text,
        parent: { _id: newComment.parentId || newComment.id } // чтоб вписалось в дерево в нужном месте
      }
    ], id),
    (item, shift) => ({ ...item, shift }) // надо какоето свойство, чтоб указать уровень сдвига
  ), [comments, newComment]);

  //console.log('list:', list);

  const callbacks = {
    onReply: useCallback(
      (parentId, name) => setNewComment(() => ({ ...baseComment, parentId, text: 'Мой ответ для ' + name })), []),
    onCancel: useCallback(() => setNewComment(baseComment), [baseComment]),
    onSubmit: useCallback(() => {
      send(newComment);
      setNewComment(comment => ({ ...comment, text: '' }));
    }, [newComment]),
    onChange: useCallback(text => setNewComment(comment => ({ ...comment, text })), []),
    onSignin: useCallback(() => navigate('/login', { state: { back: location.pathname } }), [navigate]),
    onRemove: useCallback(id => remove(id), []),
  };

  useEffect(() => {
    if (!newComment.parentId) // не скроллим за "новым комментом"
      return;
    const nodeOffset = ref.current?.offsetTop;
    const innerHeight = window.innerHeight;
    window.scrollTo({ top: nodeOffset - innerHeight / 2, behavior: "smooth" });
  }, [newComment]);

  const renders = {

    // коммент
    comment: useCallback(comment => (
      <CommentItem
        key={comment._id}
        id={comment._id}
        user={{ name: comment.author?.profile?.name, _id: comment.author?._id }}
        isMine={user?._id == comment.author?._id} // определяем, что коммент написан нами
        date={comment.dateCreate}
        text={comment.text}
        onReply={callbacks.onReply}
        shift={comment.shift <= 10 ? comment.shift : 10}
        t={t}
        onRemove={remove != null ? callbacks.onRemove : null} // парам для теста
      />
    ), [t, user, newComment]),

    // форма для ввода
    editor: useCallback(editor => (
      <CommentEditor
        key={editor._id}
        isAuth={exists}
        isReply={newComment.parentId ? true : false}
        text={editor.text}
        onChange={callbacks.onChange}
        onSubmit={callbacks.onSubmit}
        onCancel={callbacks.onCancel}
        onSignin={callbacks.onSignin}
        shift={editor.shift <= 10 ? editor.shift : 10}
        reff={ref}
        t={t}
      />
    ), [t, user, newComment])
  };

  return (
    <CommentList list={list} comment={renders.comment} editor={renders.editor} t={t} />
  );
}

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  send: PropTypes.func,
  remove: PropTypes.func
}

Comments.defaultProps = {
  send: (obj) => { },
  remove: null
}

export default React.memo(Comments);