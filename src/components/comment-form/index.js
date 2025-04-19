import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';

function CommentForm({ parentId, parentType = 'article', replyToUserId }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const cn = bem('CommentForm');

  // При монтировании компонента добавляем префикс с адресатом
  useEffect(() => {
    if (parentType === 'comment' && replyToUserId) {
      setText(`Мой ответ для User №${replyToUserId}\n`);
    }
  }, [parentType, replyToUserId]);

  const onSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(commentsActions.add(text, parentId, parentType));
      setText('');
    }
  };

  const onCancel = () => {
    dispatch(commentsActions.setReply(null));
  };

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2>{parentType === 'article' ? 'Новый комментарий' : 'Новый ответ'}</h2>
      <textarea
        className={cn('input')}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Введите комментарий..."
      />
      <div className={cn('buttons')}>
        <Button style="primary" type="submit" title="Отправить" />
        {parentType === 'comment' && (
          <Button style="outline" type="button" onClick={onCancel} title="Отмена" />
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  parentId: PropTypes.string.isRequired,
  parentType: PropTypes.string,
};

export default memo(CommentForm);
