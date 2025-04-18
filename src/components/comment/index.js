import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comment({ setParent = () => {}, id, dateCreate, name, text }) {
  const cn = bem('Comment');

  const date = new Date(dateCreate);

  const dateFromDate = {
    date: date.getDate(),
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };

  const callbacks = {
    setParent: () => {
      setParent(id);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <h3 className={cn('username')}>{name}</h3>
        <span className={cn('date')}>{`${dateFromDate.date} ${
          dateFromDate.month
        } ${dateFromDate.year} в ${dateFromDate.hours}:${
          dateFromDate.minutes > 10 ? dateFromDate.minutes : '0' + dateFromDate.minutes
        }`}</span>
      </div>
      <p className={cn('text')}>{text}</p>
      <div className={cn('reply')}>
        <button onClick={callbacks.setParent} className={cn('action')}>
          Ответить
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
