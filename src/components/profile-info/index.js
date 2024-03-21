import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileInfo({profile, t}) {
    const cn = bem('ProfileInfo');
  return (
    <div className={cn('container')}>
        <h1>{t('profile')}</h1>
        <p>{t('name')}<strong>{profile.result?.profile?.name}</strong></p>
        <p>{t('phone')}<strong>{profile.result?.profile?.phone}</strong></p>
        <p>email: <strong>{profile.result?.email}</strong></p>
    </div>
  );
}

export default memo(ProfileInfo);