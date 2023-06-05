import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import useTranslate from "../../hooks/use-translate";

function ProfileInfo({data}) {
  const cn = bem('ProfileInfo');
  const {t} = useTranslate();

  if (!data) return;

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile')}</h2>
      <div className={cn('info')}>
        <p className={cn('text')}> {t('name')}:
          <span className={cn('text', {weight: "bold"})}>
            {data.profile.name}
          </span>
        </p>

        <p className={cn('text')}> {t('telephone')}:
          <span className={cn('text', {weight: "bold"})}>
            {data.profile.phone}
          </span>
        </p>

        <p className={cn('text')}> {t('email')}:
          <span className={cn('text', {weight: "bold"})}>
            {data.email}
          </span>
        </p>
      </div>
    </div>
  )
}

export default memo(ProfileInfo);
