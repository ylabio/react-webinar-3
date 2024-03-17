import React, {useCallback} from 'react';
import SideLayout from "../../components/side-layout";
import UserTools from "../../components/user-tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

const UserPanel = () => {

  const store = useStore()

  const select = useSelector(state => ({
    username: state.user.data.name
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <SideLayout side={'end'} padding={'medium'}>
      <UserTools username={select.username} login={'/login'} profile={'/profile'} onClick={callbacks.logout} />
    </SideLayout>
  );
};

export default React.memo(UserPanel);
