import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";

function loginTab() {

  const store = useStore();

  const select = useSelector(state => ({
    user: state.login.loginData
  }))

  const callbacks = {
    onLogOut: useCallback(() => store.actions.login.logout(), [store])
  };

  const {t} = useTranslate();

  if(select.user && Object.keys(select.user).length !== 0) {
    return (
      <SideLayout side={'end'}>
        <Link to="/profile">{select.user.profile.name}</Link>
        <button onClick={callbacks.onLogOut}>
          {t('logout.btn')}
        </button>
      </SideLayout>
    )
  }

  return (
    <Link to="/login">
      <button>
        {t('login.btn')}
      </button>
    </Link>
  )
  
}

export default memo(loginTab);