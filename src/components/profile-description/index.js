import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileDescription({ user }) {
  const cn = bem('ProfileDescription');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>Профиль</h1>
      <div className={cn('line')}>
        <span className={cn('label')}>Имя: </span>
        <b className={cn('value')}>{user?.profile?.name}</b>
      </div>
      <div className={cn('line')}>
        <span className={cn('label')}>Телефон: </span>
        <b className={cn('value')}>{user?.profile?.phone}</b>
      </div>
      <div className={cn('line')}>
        <span className={cn('label')}>email: </span>
        <b className={cn('value')}>{user?.email}</b>
      </div>
    </div>
  );
}

ProfileDescription.propTypes = {
  user: PropTypes.object,
};

export default memo(ProfileDescription);