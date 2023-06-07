import {memo, useCallback } from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileDetail({userData}) { 

  const cn = bem('ProfileDetail');

  return (  
    <div className={cn()}>
        <h2 className={cn('title')}>Профиль</h2>
        <p>Имя: <strong>{userData.name}</strong></p>       
        <p>Телефон: <strong>{userData.phone}</strong></p>       
        <p>email: <strong>{userData.email}</strong></p>                   
    </div>   
  )
}

ProfileDetail.propTypes = {
  userData: PropTypes.shape({   
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
}

export default memo(ProfileDetail);
