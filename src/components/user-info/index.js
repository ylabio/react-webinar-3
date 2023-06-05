import { memo } from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css'

function UserInfo({user, t}){
  const cn = bem('UserInfo');
  return (
  <div className={cn()}>
    <h2 className={cn('header')}>{t('profile')}</h2>
    <div className={cn('item')}>
      <span className={cn('item__title')}>{t('name')}:&nbsp;</span>
      <span className={cn('item__value')}>{user.name}</span>
    </div>
    <div className={cn('item')}>
      <span className={cn('item__title')}>{t('phone')}:&nbsp;</span>
      <span className={cn('item__value')}>{user.phone}</span>
    </div>
    <div className={cn('item')}>
      <span className={cn('item__title')}>{t('email')}:&nbsp;</span>
      <span className={cn('item__value')}>{user.email}</span>
    </div>
  </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object,
  t: PropTypes.func
}

export default memo(UserInfo)