import { memo } from "react";
import './style.css'
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';

function ProfileCard(props) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.t('profile.title')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.t('profile.name')}:</div>
        <div className={cn('value')}>{props.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.t('profile.phone')}:</div>
        <div className={cn('value')}>{props.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{props.t('profile.email')}:</div>
        <div className={cn('value')}>{props.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func
};

ProfileCard.defaultProps = {
  t: (text) => text
}

export default memo(ProfileCard);
