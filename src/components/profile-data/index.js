import {memo} from 'react';
import PropTypes, {oneOfType} from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileData (props) {

  const cn = bem('ProfileData');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.title}</h2>
      <div className={cn('data')}>
        <div className={cn('label')}>{props.name}:</div>
        <div className={cn('value')}>{props.profile.name}</div>
      </div>
      <div className={cn('data')}>
        <div className={cn('label')}>{props.telephone}:</div> 
        <div className={cn('value')}>{props.profile.phone}</div>
      </div>
      <div className={cn('data')}>
        <div className={cn('label')}>email:</div> 
        <div className={cn('value')}>{props.profile.email}</div>
      </div>
    </div>
  );
}

ProfileData.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  telephone: PropTypes.string,
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string
  }).isRequired,
}

export default memo(ProfileData);