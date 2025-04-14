import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ name, email, phone }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h1>Профиль</h1>
      <div className={cn('content')}>
        <div className={cn('prop-wrapper')}>
          <div className={cn('prop')}>
            <div className={cn('label')}>Имя:</div>
            <div className={cn('value')}>{name}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>Телефон:</div>
            <div className={cn('value')}>{phone}</div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>Email:</div>
            <div className={cn('value')}>{email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};

export default memo(ProfileCard);
