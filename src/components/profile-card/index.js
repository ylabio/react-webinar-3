import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const { profile, fields, t = text => text } = props;
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{fields.name}:</div>
          <div className={cn('value')}>{profile.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{fields.phone}:</div>
          <div className={cn('value')}>{profile.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{fields.email}:</div>
          <div className={cn('value')}>{profile.email}</div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  fields: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  t: PropTypes.func,
};

export default memo(ProfileCard);
