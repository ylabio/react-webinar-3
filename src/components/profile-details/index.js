import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import {memo} from "react";
import './style.css';

function ProfileDetails(props) {
  const cn = bem('ProfileDetails');
  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Профиль</h3>
      <div className={cn('info')}>
        <div className={cn('item')}>Имя: <span>{props.data?.name}</span></div>
        <div className={cn('item')}>Телефон: <span>{props.data?.phone}</span></div>
        <div className={cn('item')}>Email: <span>{props.data?.email}</span></div>
      </div>
    </div>
  )
}

ProfileDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  })
}

export default memo(ProfileDetails);