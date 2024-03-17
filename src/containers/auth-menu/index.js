import {memo, useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import {Link} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";


function AuthMenu() {
	const store = useStore();

	const select = useSelector(state => ({
    user: state.auth.user
  }));

	const callbacks = {
    onlogout: useCallback(() => {store.actions.auth.logout()}, []),
  }

	const {t} = useTranslate();

  return (
    <SideLayout side={'end'} padding={'small-and-medium'} gap={'big'}>
      {select.user ? <Link to={'/profile'}>{select?.user?.profile?.name}</Link> : <></>}
      {select.user ?
        <button onClick={callbacks.onlogout}>{t('auth.logout')}</button> :
        <Link to={`/login`}><button>{t('auth.login')}</button></Link>}
    </SideLayout>)
}

export default memo(AuthMenu);