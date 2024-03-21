import {memo} from "react";
import SideLayout from "../../components/side-layout";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({t, name, email, phone}) {

  const cn = bem('ProfileCard');
  return (
    <SideLayout side='start' padding='medium'>
    <div className={cn()}>
      <h3 className={cn('title')}>{t('login.profile')}</h3>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('login.userName')}:</div>
        <div className={cn('value')}>{name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('login.phone')}:</div>
        <div className={cn('value')}>{phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('login.email')}:</div>
        <div className={cn('value')}>{email}</div>
      </div>
    </div>
    </SideLayout>
  );
}

export default memo(ProfileCard);
