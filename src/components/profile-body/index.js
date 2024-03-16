import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileBody({t,name,phone,email,profileText}) {


  const cn = bem('ProfileBody');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{profileText.title}</h2>
      <p className={cn('item')}>
        <b>{profileText.name}: </b>
        <span>{name}</span>
      </p>
      <p className={cn('item')}>
        <b>{profileText.phone}: </b>
        <span>{phone}</span>
      </p>
      <p className={cn('item')}>
        <b>email: </b>
        <span>{email}</span>
      </p>
    </div>
  );
}

ProfileBody.propTypes = {
  t: PropTypes.func,
  name:PropTypes.string,
  phone:PropTypes.string,
  email:PropTypes.string,
  profileText:PropTypes.object
};

ProfileBody.defaultProps = {
  t: (text) => text,
  name:"",
  phone: null,
  email:"",
}

export default memo(ProfileBody);
