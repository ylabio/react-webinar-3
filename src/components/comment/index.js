import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format';


function Comment({
  onClick = () => {},
  item = {},
  buttonTitle,
  user = '',
  }) {
  const cn = bem('Comment');
  const isAuthor = user === item.author?.profile.name;
  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <h4 className={cn('profile', { isAuthor })}>{item.author?.profile.name}</h4>
        <span className={cn('date')}>{dateFormat(item.dateCreate)}</span>
      </div>
      <div className={cn('main')}>
        <p>
        {item.text}
        </p>
      </div>
      <button className={cn('button')} onClick={() => onClick(item._id)}>{buttonTitle}</button>
    </div>
  );
}

Comment.propTypes = {
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string
};

export default memo(Comment);
