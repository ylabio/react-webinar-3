import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({userInfo, t}) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn("title")}>{t("profile")}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{userInfo.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{userInfo.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{userInfo.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  userInfo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profile: PropTypes.object,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func
};

ProfileCard.defaultProps = {
  t: (text) => text
}

export default memo(ProfileCard);
