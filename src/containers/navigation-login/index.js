import {memo, useCallback,useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import MenuSite from "../../components/menu-site";
import useSelector from "../../hooks/use-selector";

/**
 * Контейнер с компонентами навигации для входа на сайт
 */
function NavigationLogin() {

  const store = useStore();

  useInit(() => {
  }, [], true);

  const select = useSelector(state => ({
    token: state.user.token,
    user: state.user.data.name,
    autorization: state.user.autorization,
    waiting: state.user.waiting,
  }));

  const callbacks = {
    // Обработка перехода на на страницу входа пользователя на сайт и выхода пользователя с сайта
    onFunc: useCallback((item) => {
      if (item.key == 222) {
        store.actions.user.fExit();
        store.actions.user.setParams('');
        store.actions.catalog.initParams();
      }
    }, [store,select]),
  }

  const {t} = useTranslate();

  const options = {
    menuSiteLogin: useMemo(() => ([
    {key: 221, title: t('menuSite.login'), link: `/login`},
    ]), [t,select]),

    menuSiteExit: useMemo(() => ([
      {key: 223, title: select.user, link: `/profile?token=${select.token}`},
      {key: 222, title: t('menuSite.exit'), profile: (window.location.pathname == `/profile` ? true : false)},
      ]), [t,select]),
  };

  return (
    //<SideLayout>
        <MenuSite items={(select.autorization == false ? options.menuSiteLogin : options.menuSiteExit)}
                  onNavigate={callbacks.onFunc}/>
    //</SideLayout>
  );
}

export default memo(NavigationLogin);
