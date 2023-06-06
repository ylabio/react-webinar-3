import {memo, useCallback, useEffect, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LoginButtons from "../../components/login-buttons";
import HeaderLayout from "../../layouts/header-layout";
import Head from "../../components/head";

function Header({title}) {

  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    userName: state.session.userInfo.name,
    loggedIn: state.session.loggedIn,
  }));

  const callbacks = {
    onExitAccount: useCallback(() => {store.actions.session.removeUserInfo(); store.actions.user.logout()}, [select.loggedIn])
  }

  return (
    <HeaderLayout>
      <LoginButtons userName={select.userName} onExitAccount={callbacks.onExitAccount} t={t} loggedIn={select.loggedIn}/>
      <Head title={title}/>
    </HeaderLayout>
  );
}



export default memo(Header);
