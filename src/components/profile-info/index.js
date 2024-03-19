import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileInfo({profile}) {

  const cn = bem('ProfileInfo')

  return (
    <>
      <div className={cn()}>
        <div className={cn('label')}>Имя:</div>
        <div className={cn('value')}>{profile.name}</div>
      </div>
      <div className={cn()}>
        <div className={cn('label')}>Телефон: </div>
        <div className={cn('value')}>{profile.phone}</div>
      </div>
      <div className={cn()}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{profile.email}</div>
      </div>
    </>
  )
}

ProfileInfo.PropTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
  })
}

export default React.memo(ProfileInfo);