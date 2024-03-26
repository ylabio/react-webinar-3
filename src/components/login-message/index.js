import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const LoginMessage = ({ onCancel, reply = false, t }) => {
  const cn = bem('LoginMessage');

  return (
    <div className={reply && cn()}>
      <Link to="/login" className={cn('login')}>Войдите</Link>
      <span className={cn('text')}>,
        чтобы иметь возможность
        {reply ? " ответить" : "  комментировать"}.
      </span>
      {' '}
      {reply && <button type='button' className={cn('button')} onClick={onCancel}>Отмена</button>}
    </div>
  );
};

LoginMessage.propTypes = {
  onCancel: PropTypes.func,
  reply: PropTypes.bool,
  t: PropTypes.func,
};

export default memo(LoginMessage);