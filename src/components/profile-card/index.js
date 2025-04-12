import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>Профиль</div>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>Имя:</div>
          <div className={cn('value')}>{props.userData.profile?.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Телефон:</div>
          <div className={cn('value')}>{props.userData.profile?.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>Email:</div>
          <div className={cn('value')}>{props.userData.email}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProfileCard);
