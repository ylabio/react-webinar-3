import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import SideLayout from "../../components/side-layout";
import Hyperlink from "../../components/hyperlink";
import useTranslate from "../../hooks/use-translate";

function ProfileBar() {
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector(state => ({
    user: state.user.user,
  }));
  const {t} = useTranslate();

  const callbacks = {
    onLoginClick: useCallback((e) => {
      e.preventDefault();
      navigate("/login");
    }, [navigate]),

    onLogoutClick: useCallback((e) => {
      e.preventDefault();
      store.actions.user.logout();
    }, [store]),
  };

  const renderButton = useCallback(() => {
    let callback;
    let caption;
    if (select.user) {
      callback = callbacks.onLogoutClick;
      caption = t("profile.logout");
    } else {
      callback = callbacks.onLoginClick;
      caption = t("profile.login");
    }
    return (<button key="profile-button" onClick={callback}>{caption}</button>);
  }, [select.user, callbacks.onLoginClick, callbacks.onLogoutClick, t]);


  return (
    <SideLayout side="end">
      {select.user && <Hyperlink key="profile-link" to="/profile" caption={select.user.profile.name} />}
      {renderButton()}
    </SideLayout>
  )
}

export default memo(ProfileBar);
