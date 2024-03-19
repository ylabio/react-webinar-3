import {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import Button from "../../components/button";
import HeaderInfo from "../../components/header-info";

function Header() {
  const navigate = useNavigate();
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
    token: state.auth.token,
    result: state.user.result,
  }));

  const callbacks = {
    onSignOut: useCallback(() => {
      store.actions.auth.signOut(select.token);
      store.actions.user.setIsLogged();
    }, [store, select.token]),
  }

  const links = {
    toAuth: useCallback(() => navigate('/login'), []),
    toProfile: '/profile',
  }
  
  return (
    <SideLayout side={'end'} padding={'medium'} border={'bottom'}>
      {select.isLogged 
        ? <HeaderInfo user_name={select.result.profile.name} text_btn={t('signout')} 
                      link={links.toProfile} onClick={callbacks.onSignOut}/>
        : <Button text_btn={t('signin')} onClick={links.toAuth} />
      }
    </SideLayout>
  )  
}

export default memo(Header);

