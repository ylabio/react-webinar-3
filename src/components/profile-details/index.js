import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileDetails(props) {
  const { name, phone, email, t = text => text } = props;
  const cn = bem('ProfileDetails');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Профиль</div>
      <div className={cn('text')}>
        {t('Имя')}: <span className={cn('text__bold')}>{name}</span>
      </div>
      <div className={cn('text')}>
        {t('Телефон')}: <span className={cn('text__bold')}>{phone}</span>
      </div>
      <div className={cn('text')}>
        {t('Email')}: <span className={cn('text__bold')}>{email}</span>
      </div>
    </div>
  );
}

ProfileDetails.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func,
};

export default memo(ProfileDetails);
