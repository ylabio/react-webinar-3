import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function UserInfo(props) {
  const { info, t = text => text } = props;
  const cn = bem('UserInfo');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.name')}:</div>
          <div className={cn('value')}>
            {info.name}
          </div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.phone')}:</div>
          <div className={cn('value')}>{info.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.email')}:</div>
          <div className={cn('value')}>{info.email}</div>
        </div>
      </div>
    </div>
  );
}

UserInfo.PropTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  t: PropTypes.func,
};

export default memo(UserInfo);
