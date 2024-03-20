import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useTranslate from "../../hooks/use-translate";

function UserInfo({ user }) {
  const cn = bem('UserInfo');
  const { t } = useTranslate();
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('user.profile')}</h2>
      {user.profile && (
        <>
          <div className={cn('row')}>
            {t('user.name')}: <b>{user.profile.name}</b>
          </div>
          <div className={cn('row')}>
            {t('user.phone')}: <b>{user.profile.phone}</b>
          </div>
        </>
      )}
      <div className={cn('row')}>
        {t('user.email')}: <b>{user.email}</b>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object, 
};

export default memo(UserInfo);
