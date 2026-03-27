import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';


function User(props) {
  const cn = bem('User');

  return (
    <div className={cn()}>
      <h1>{props.title}</h1>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{props.userLabel}</div>
          <div className={cn('value')}>{props.userName}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{props.userPhone}</div>
          <div className={cn('value')}>{props.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{props.userEmail}</div>
          <div className={cn('value')}>{props.email}</div>
        </div>
      </div>
    </div>
  );
}

User.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default memo(User);