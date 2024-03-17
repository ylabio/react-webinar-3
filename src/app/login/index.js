import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountBlock from '../../components/account-block'
import Head from '../../components/head'
import LoginCard from '../../components/login-card'
import PageLayout from '../../components/page-layout'
import LocaleSelect from '../../containers/locale-select'
import Navigation from '../../containers/navigation'
import useInit from '../../hooks/use-init'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import useTranslate from '../../hooks/use-translate'


/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.users.data
  }));

  console.log(select.user)

  useInit(() => {
    if (select.user?.profile?.name) {
      navigate('/profile')
    }
  }, [select.user?.profile?.name])

  const callbacks = {
    // Добавление в корзину
    login: useCallback(data => store.actions.users.login(data), [store]),
  }

  return (
    <PageLayout>
      <AccountBlock title={t('account.login')} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginCard onLogin={callbacks.login}/>
    </PageLayout>
  );
}

export default memo(Login);
