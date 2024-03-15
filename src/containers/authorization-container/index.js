import { memo, useCallback } from "react";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";


function AuthorizationContainer() {

  const store = useStore();
  const {t} = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    session: state.authorization.session,
    user: state.authorization.user,
  }))

  const callbacks = {
    onSigIn: useCallback(() => {
      navigate('/login', {state: {backNavigate: location.pathname}})
    }, []),
    onSigOut: useCallback(() => {store.actions.authorization.signOut()}, []),
  }


  return (
    <SideLayout side={ 'end' } padding={ 'small' }>
      { select.session && <Link to={ '/profile' }>{ select.user?.profile?.name }</Link> }
      {
        select.session ?
          <button onClick={ callbacks.onSigOut }>{ t( 'button.signOut' ) }</button> :
          <button onClick={ callbacks.onSigIn }>{ t( 'button.signIn' ) }</button>
      }
    </SideLayout>)
}


export default memo( AuthorizationContainer );