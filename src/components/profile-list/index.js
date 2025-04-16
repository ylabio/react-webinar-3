import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import './style.css';

function ProfileList() {
  const { t } = useTranslate();
  const cn = bem('ProfileList');
  const { data, loading } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth); // Или только из profile.data

  // Если данные грузятся
  if (loading) return <div>{t('loading')}</div>;

  return (
    <section className={cn()}>
      <h2 className={cn("caption")}>{t('profile')}</h2>
      <dl className={cn("list")}>
        <dt>{t('profile.name')}:</dt>
        <dd>{user?.profile?.name || data?.name || 'N/A'}</dd> {/* Берём из auth или profile */}

        <dt>{t('profile.phone')}:</dt>
        <dd>{data?.phone || 'N/A'}</dd>

        <dt>Email:</dt>
        <dd>{user?.email || data?.email || 'N/A'}</dd>
      </dl>
    </section>
  );
}

export default memo(ProfileList);
