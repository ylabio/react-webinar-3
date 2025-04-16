import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileList({ name, phone, email, isLoading, t }) {
  const cn = bem('ProfileList');

  if (isLoading) {
    return <div className={cn('loading')}>{t('loading')}</div>;
  }

  return (
    <section className={cn()}>
      <h2 className={cn('caption')}>{t('profile')}</h2>
      <dl className={cn('list')}>
        <dt>{t('profile.name')}:</dt>
        <dd>{name || 'N/A'}</dd>

        <dt>{t('profile.phone')}:</dt>
        <dd>{phone || 'N/A'}</dd>

        <dt>Email:</dt>
        <dd>{email || 'N/A'}</dd>
      </dl>
    </section>
  );
}

ProfileList.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool,
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProfileList.defaultProps = {
  name: '',
  phone: '',
  email: '',
  isLoading: false,
  className: '',
};

export default memo(ProfileList);
