import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useEffect, useState } from 'react';

function Comment({
  setParent = () => {},
  id,
  dateCreate,
  name,
  text,
  t,
  existsUserName,
  maxNesting,
  setOffsetForm,
  comment,
  setCommentId = () => {},
}) {
  const cn = bem('Comment');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const maxOffset = comment.offset > maxNesting ? maxNesting : comment.offset;
    setOffset(maxOffset);
  }, [setOffset]);

  const date = new Date(dateCreate);

  const dateFromDate = {
    date: date.getDate(),
    month: date.toLocaleString(t('comment.locale'), { month: 'long' }),
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };

  const getLastChild = comment => {
    if (comment.children && comment.children.length > 0) {
      const lastChild = comment.children.at(-1);
      if (lastChild.children && lastChild.children.length > 0) {
        return getLastChild(lastChild);
      }
      return lastChild._id;
    }
    return comment._id;
  };

  const callbacks = {
    setParent: () => {
      const lastChild = getLastChild(comment);
      setParent(lastChild);
      setOffsetForm(offset);
      setCommentId(id);
    },
  };

  return (
    <div className={cn()} style={{ paddingLeft: `${offset * 40}px` }}>
      <div className={cn('header')}>
        <h3 className={cn('username', { current: existsUserName === name })}>{name}</h3>
        <span className={cn('date')}>{`${dateFromDate.date} ${
          dateFromDate.month
        } ${dateFromDate.year} ${t('comment.at')} ${dateFromDate.hours}:${
          dateFromDate.minutes > 10 ? dateFromDate.minutes : '0' + dateFromDate.minutes
        }`}</span>
      </div>
      <p className={cn('text')}>{text}</p>
      <div className={cn('reply')}>
        <button onClick={callbacks.setParent} className={cn('action')}>
          {t('comment.reply')}
        </button>
      </div>
    </div>
  );
}

Comment.protoTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dateCreate: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  setParent: PropTypes.func,
};

export default Comment;
