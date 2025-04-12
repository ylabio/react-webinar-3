import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ email, name, phone, t }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('user.profile')}</h1>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          <p>{t('user.name')}:</p>
          <span>{name}</span>
        </li>
        <li className={cn('item')}>
          <p> {t('user.phone')}:</p>
          <span>{phone}</span>
        </li>
        <li className={cn('item')}>
          <p> Email:</p>
          <span>{email}</span>
        </li>
      </ul>
    </div>
  );
}

ProfileCard.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default memo(ProfileCard);
