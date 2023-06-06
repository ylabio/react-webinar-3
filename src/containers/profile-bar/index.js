import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import ProfileBar from "../../components/profile-bar";
import {memo, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function ProfileSection() {
  const navigate = useNavigate();
  const store = useStore();
  const {t} = useTranslate();

  useEffect(() => {
    store.actions.user.checkAuth();
    store.actions.profile.load();
  }, [])

  const select = useSelector(state => ({
    isLogin: state.user.authorized,
    user: state.profile.data,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
    onLogin: useCallback(() => {
      navigate('/login', {state: {from: location}})
    }, []),
  }

  return (
    <ProfileBar
      name={select.user?.profile?.name}
      action={select.isLogin ? callbacks.onLogout : callbacks.onLogin}
      t={t}
      link={'/profile'}
    />
  )
}
export default memo(ProfileSection)