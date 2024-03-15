import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileBody({t,name,phone,email}) {


  const cn = bem('ProfileBody');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <p className={cn('item')}>
        <b>Имя:</b>
        <span>{name}</span>
      </p>
      <p className={cn('item')}>
        <b>Телефон:</b>
        <span>{phone}</span>
      </p>
      <p className={cn('item')}>
        <b>email:</b>
        <span>{email}</span>
      </p>
    </div>
  );
}

ProfileBody.propTypes = {
  t: PropTypes.func,
  name:PropTypes.string,
  phone:PropTypes.number,
  email:PropTypes.string,
};

ProfileBody.defaultProps = {
  t: (text) => text,
  name:"",
  phone: null,
  email:"",
}

export default memo(ProfileBody);
