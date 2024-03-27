import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({data, tt}) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{tt('profile.header')}</h3>
      <div className={cn('prop')}>
        <div className={cn('label')}>{tt('profile.name')}:</div>
        <div className={cn('value')}>{data?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{tt('profile.phone')}:</div>
        <div className={cn('value')}>{data?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{data?.email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  data: PropTypes.object.isRequired,
};

ProfileCard.defaultProps = {
  onAdd: () => {
  }
}

export default memo(ProfileCard);
