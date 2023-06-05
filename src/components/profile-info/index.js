import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileInfo({name, phone, email, t}) {
  const cn = bem('ProfileInfo');
  return (
    <div className={cn()}>
      <div className={cn('title')}>{t("profile.title")}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t("profile.name")}:</div>
        <div className={cn('value')}>{name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t("profile.phone")}:</div>
        <div className={cn('value')}>{phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{email}</div>
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func
};

ProfileInfo.defaultProps = {
  name: "Имя",
  phone: "Телефон",
  email: "email",
  t: (text) => text
}

export default memo(ProfileInfo);
