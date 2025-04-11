import { memo } from 'react';

import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

import useTitle from '../../hooks/use-title';

import './style.css';

function UserInfo() {
  const select = useSelector(state => ({
    userData: state.user.userInfo,
  }));
  const { t } = useTranslate();

  useTitle(`${t('title')} / ${select.userData.name}`);

  return (
    <div className="UserInfo">
      <h2>{t('profile')}</h2>
      <div className="UserInfo-container">
        <div className="UserInfo-text">
          <span className="UserInfo-category">{t('profile.name')}:</span>
          <span className="UserInfo-description">{select.userData.name}</span>
        </div>
        <div className="UserInfo-text">
          <span className="UserInfo-category">{t('profile.phone')}:</span>
          <span className="UserInfo-description">{select.userData.phone}</span>
        </div>
        <div className="UserInfo-text">
          <span className="UserInfo-category">Email:</span>
          <span className="UserInfo-description">{select.userData.email}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(UserInfo);
