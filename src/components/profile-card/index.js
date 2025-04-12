import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Профиль</div>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>Имя:</div>
          <div className={cn('value')}>{props.user?.profile?.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Телефон:</div>
          <div className={cn('value')}>{props.user?.profile?.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Email:</div>
          <div className={cn('value')}>{props.user?.email}</div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
  }),
};

export default memo(ProfileCard);
