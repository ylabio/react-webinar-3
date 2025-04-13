import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const { user } = props;

  const cn = bem('ProfileCard');
  
  return (
    <div className={cn()}>
        <div className={cn('title')}>
          <h1>Профиль</h1>
        </div>
        <div className={cn('prop-wrapper')}>
          <div className={cn('prop')}>
            <div className={cn('label')}>Имя:</div>
            <div className={cn('value')}>
              {user?.profile?.name}
            </div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>Телефон:</div>
            <div className={cn('value')}>
              {user?.profile?.phone}
            </div>
          </div>
          <div className={cn('prop')}>
            <div className={cn('label')}>Email:</div>
            <div className={cn('value')}>
              {user?.email}
            </div>
          </div>
        </div>
      </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }).isRequired,
};

export default memo(ProfileCard);
