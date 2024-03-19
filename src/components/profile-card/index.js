import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const cn = bem('ProfileCard');

  const callbacks = {
    t: text => props.t(text)
  }

  return (
    <div className={cn()}>
      <h2>{callbacks.t('profile')}</h2>
      <div className={cn('field')}>
        <span className={cn('label')}>{callbacks.t('profile.name')}:</span>
        <span className={cn('value')}>{props.user ? props.user.profile.name : ''}</span>
      </div>
      <div className={cn('field')}>
        <span className={cn('label')}>{callbacks.t('profile.phone')}:</span>
        <span className={cn('value')}>{props.user ? props.user.profile.phone : ''}</span>
      </div>
      <div className={cn('field')}>
        <span className={cn('label')}>{callbacks.t('profile.email')}:</span>
        <span className={cn('value')}>{props.user ? props.user.email : ''}</span>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string
  }),
  t: PropTypes.func
};

ProfileCard.defaultProps = {
  user: null,
  t: (text) => text
}

export default memo(ProfileCard);
