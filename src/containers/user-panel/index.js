import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate.js";
import useStore from "../../hooks/use-store.js";
import useSelector from "../../hooks/use-selector.js";
import SideLayout from "../../components/side-layout/index.js";
import { Link, useNavigate } from "react-router-dom";
import './style.css'
import { deleteCookie, getAuthToken } from "../../utils.js";
import useInit from "../../hooks/use-init.js";

/**
 * Контейнер со пользовательской панелью
 */
function UserPanel() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    userData: state.auth.userData,
  }));

  const callbacks = {
    onLogOut: useCallback(token => store.actions.auth.logOutUser(token), [store])
  };

  const {t} = useTranslate();

  const handleLogIn = () => {
    navigate("/login")
  }

  const handleLogOut = () => {
    callbacks.onLogOut(getAuthToken());
    deleteCookie('token')
  }

  return (
    <SideLayout side='end' padding='small'>
      {Object.keys(select.userData).length ? <div className="UserPanel">
                                              <Link to='/profile' >{select.userData.profile.name}</Link>
                                              <button onClick={handleLogOut}>Выход</button>
                                             </div>
                                            : <button onClick={handleLogIn}>Вход</button>}
    </SideLayout>
  )
}

export default memo(UserPanel);
