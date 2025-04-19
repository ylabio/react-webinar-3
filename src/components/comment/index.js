import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

function Comment({ data, onReply, isAuth }) {
  const cn = bem('Comment');

  // Форматируем дату в нужный формат
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} в ${hours}:${minutes}`;
  };

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('author')}>User №{data.author?._id}</span>
        <span className={cn('date')}>{formatDate(data.dateCreate)}</span>
      </div>
      <div className={cn('text')}>{data.text}</div>
      {isAuth && (
        <div className={cn('actions')}>
          <Button style="text" onClick={() => onReply(data._id)} title="Ответить" />
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }).isRequired,
  onReply: PropTypes.func,
  showReplyForm: PropTypes.string,
  isAuth: PropTypes.bool,
};

export default memo(Comment);
