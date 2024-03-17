import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import UserControls from "../../components/user-controls";
import { useNavigate } from "react-router-dom";

function TopControls() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.data,
  }));

  const navigate = useNavigate();
  const callbacks = {
    onLogIn: useCallback(() => navigate('/login'), []),
    onLogOut: useCallback(() => {
      store.actions.user.logOut();
      navigate('/');
    } , [store]),
  }
  const {t} = useTranslate();

  const userCallback = select.user
    ? callbacks.onLogOut
    : callbacks.onLogIn;

  const userBtnLabel = select.user
    ? t('user.logout')
    : t('user.login');

  return (
    <SideLayout side='end' padding='small'>
      <UserControls onClick={userCallback}
                    user={select.user}
                    btnLabel={userBtnLabel}
                    link='/profile'
      />
    </SideLayout>
  );
}

export default memo(TopControls);
