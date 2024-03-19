import { memo, useCallback, useEffect } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import ProfileInfo from '../../components/profile-info';
import useInit from '../../hooks/use-init';
import { useNavigate } from 'react-router-dom';

function Profile() {

  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector(state => ({
    profileInfo: state.auth.profileInfo
  }));
  useInit(() => {
    if (select.profileInfo.result) {} else navigate('/login')
    }, [select.profileInfo])

    const {t} = useTranslate();
  return (
    <>
    <Navigation/>
    <ProfileInfo profile={select.profileInfo} t={t}/>
    </>
  );
}

export default memo(Profile);