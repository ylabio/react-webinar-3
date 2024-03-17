import {memo} from "react";
import useTranslate from "../../hooks/use-translate";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function UserInfo({user}) {
  const cn = bem('UserInfo');
  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      
      <div className={cn('user')}>
        <div>{t('profile.username')}: <span className={cn('bold')}>{user.profile.name || ''}</span></div>
        <div>{t('profile.phone')}: <span className={cn('bold')}>{user.profile?.phone || ''}</span></div>
        <div>{t('profile.email')}: <span className={cn('bold')}>{user.email || ''}</span></div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object,
}

export default memo(UserInfo);