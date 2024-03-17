import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({title, user, name, phone }) {
  const cn = bem( 'ProfileCard' );

  return (
    <div className={cn()}>
      <h2>{title}</h2>
      <div className={cn('block')}>
        <div className={cn('label')}>{name}:</div>
        <div className={cn('value')}>{user.name}</div>
      </div>
      <div className={cn('block')}>
        <div className={cn('label')}>{phone}:</div>
        <div className={cn('value')}>{user.phone}</div>
      </div>
      <div className={cn('block')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default memo( ProfileCard );