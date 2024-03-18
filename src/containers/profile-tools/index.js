import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link } from "react-router-dom";
import useInit from "../../hooks/use-init";


function ProfileTools() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    token: state.profile.token,
    user: state.profile.user
  }));

  useInit(() => {
    store.actions.profile.setUser(select.token)
  })

  const callbacks = {
    onNavigate: useCallback(() => {

    })
  }

  return (
    <SideLayout side='end' padding='small'>
      <Link to='/profile'>{select.user? select.user.username : ''}</Link>
      <Link to={select.user? '/profile': '/login'}>
        <button>{select.user? t('auth.logout'):t('auth.login')}</button>
      </Link>
    </SideLayout>
  );
}

export default memo(ProfileTools);