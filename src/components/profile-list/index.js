import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function ProfileList() {
  const { t } = useTranslate();
  const cn = bem('ProfileList');
  return (
    <section className={cn()}>
      <h2 className={cn("caption")}>{t('profile')}</h2>
      <dl className={cn("list")}>
        <dt>{t('profile.name')}:</dt>
        <dd>User 1</dd>
        <dt>{t('profile.phone')}:</dt>
        <dd>+70000000001</dd>
        <dt>Email:</dt>
        <dd>test_50@example.com</dd>
      </dl>
    </section>
  );
}

export default memo(ProfileList);
