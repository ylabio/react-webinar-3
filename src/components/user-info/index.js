import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function UserInfo({data, t}) {
  const cn = bem('UserInfo');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      
      <div className={cn('user')}>
        <div>{t('profile.username')}: <span className={cn('bold')}>{data.profile.name}</span></div>
        <div>{t('profile.phone')}: <span className={cn('bold')}>{data.profile.phone}</span></div>
        <div>{t('profile.email')}: <span className={cn('bold')}>{data.email}</span></div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func
}

UserInfo.defaultProps = {
  t: (text) => text
}

export default memo(UserInfo);