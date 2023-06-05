import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import AuthPanel from '../../containers/auth-panel';
import ProfileInfo from '../../components/profile-info';
import Spinner from '../../components/spinner';




function Profile() {

    const store = useStore();

    const { t } = useTranslate();

    const navigate = useNavigate();
 
    useInit(async () => {
      const isTokenExist = store.actions.profile.tokenChecking()
      if (isTokenExist) {
        const isTokenValid = await store.actions.profile.getProfileInfo()

        store.actions.auth.setLoggedIn(isTokenValid)
        if (!isTokenValid) navigate("/")
      } else {
        store.actions.auth.setLoggedIn(isTokenExist)
        navigate("/")
      }

      store.actions.auth.setLoggedIn
    }, []);

    const select = useSelector(state => ({
        profileInfo: state.profile.profileInfo,
        waiting: state.profile.waiting
    }));
  
  
    return (
      <PageLayout>
        <AuthPanel/>
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <Spinner active={select.waiting}>
            <ProfileInfo {...select.profileInfo} t={t}></ProfileInfo>
        </Spinner>
      </PageLayout>
    );
}

export default memo(Profile);