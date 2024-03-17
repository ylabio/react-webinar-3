import React, {useCallback, useEffect, useMemo} from 'react'
import SideLayout from "../../components/side-layout";
import useTranslate from "../../hooks/use-translate";
import Controls from "../../components/controls";
import useSelector from "../../hooks/use-selector";
import {Link, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";

const TopMenu = () => {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    token:  state.user.token,
    user: state.user.user,
  }));

  const text = select.token ? t("logout") :  t("login");

  const callbacks = {
    onLogout: useCallback((e) => {
      store.actions.user.logout();
    }, [store])
  }

  const  onClick = () => {
    if (select.token) {
      callbacks.onLogout()
    } else {
      return navigate("/profile");
    }
  }

  return (
    <SideLayout side='end' padding='medium'>
      {select.token ? <Link to={'/profile'}>{select.user?.profile.name}</Link> : <></>}
      <Controls onClick={onClick} text={text}/>
    </SideLayout>
  )
}
export default TopMenu;
