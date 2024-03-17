import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileInfo(props) {
  const cn = bem('ProfileInfo');
  return (
    <div className={cn()}>
      <div className={cn('title')}>Профиль</div>
      <div className={cn('info')}>Имя: <b>{props.userName}</b></div>
      <div className={cn('info')}>Телефон: <b>{props.phone}</b></div>
      <div className={cn('info')}>email: <b>{props.email}</b></div>
    </div>
  );
}

ProfileInfo.propTypes = {
  userName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func
};

ProfileInfo.defaultProps = {
  userName: '',
  phone: '',
  email: '',
  t: (text) => text
}

export default memo(ProfileInfo);
