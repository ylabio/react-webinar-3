import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

import { Link, useNavigate } from "react-router-dom";

function AuthPanel() {

  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    name: state.profile.profileInfo.name,
  }));

  const callbacks = {
 
    onSignIn: useCallback(() => {
        navigate("/login");
    }, [store]),

    onSignOut: useCallback(async () => {
      await store.actions.auth.SignOut()
      navigate("/")
  }, [store]),
  };

  const {t} = useTranslate();

  return (
    <SideLayout side={"end"} gap={"medium"} padding='small-medium' border={"bottom"} margin={"no"}>
    
      {select.isLoggedIn ? (
        <div>
          <Link to="/profile">{select.name}</Link>
        </div>
      ) : ""}
 
      <button onClick={
        select.isLoggedIn ?
        callbacks.onSignOut :
        callbacks.onSignIn}>{
          select.isLoggedIn ? 
          t('auth.exit') :
          t('auth.enter')}</button>
    
    </SideLayout>
  )
}

export default memo(AuthPanel);