import {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from "../../components/profile-card";
import {useNavigate} from "react-router-dom";

function Profile({children}) {
  const navigate = useNavigate()
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
    error: state.user.error,
    token: state.user.token,
    waiting: state.user.waiting
  }));

  const callbacks = {
    check: useCallback(() => store.actions.user.check(), [store])
  }

  useEffect(() => {
    if(select.error) {
      navigate('/login')
    }
  },[select.error])

  return (
    <PageLayout>
      {children}
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
