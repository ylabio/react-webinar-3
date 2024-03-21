import {memo, useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import AppBarLayout from "../../components/app-bar-layout";
import { Link, useNavigate } from "react-router-dom";

/**
 * Контейнер с компонентами навигации
 */
function TopMenu() {
  const store = useStore();
  const navigate = useNavigate();

  const {isAuthChecked, name} = useSelector(state => ({
    isAuthChecked: state.auth.isAuthChecked,
    name: state.auth.user?.profile?.name
  }));

  const callbacks = {
    onSign: useCallback(() => {
      navigate('/login')
    }, []),
    onSignOut: useCallback(() => {
      store.actions.auth.signOut();
    }, [])
  }

  const options = {
    showLink: useMemo(() => {
      if (isAuthChecked) {
        return (<Link to={'/profile'}>{name}</Link>)
      } else {
        return ''
      }
    },[isAuthChecked]),
    toggleAuth: useMemo(() => {
      if (isAuthChecked) {
        return <button onClick={callbacks.onSignOut}>Выйти</button>
      } else {
        return <button onClick={callbacks.onSign}>Войти</button>
      }
    },[isAuthChecked]),
  };

  return (
    <AppBarLayout side='end' padding='medium'>
      {options.showLink}
      {options.toggleAuth}
    </AppBarLayout>
  );
}

export default memo(TopMenu);
