import React, {useCallback} from 'react';
import SideLayout from "../../components/side-layout";
import UserTools from "../../components/user-tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const UserPanel = () => {

  const store = useStore()

  const select = useSelector(state => ({
    username: state.user.data.name
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  const {t} = useTranslate();

  return (
    <SideLayout side={'end'} padding={'medium'}>
      <UserTools username={select.username} login={'/login'} profile={'/profile'} onClick={callbacks.logout} t={t} />
    </SideLayout>
  );
};

export default React.memo(UserPanel);
