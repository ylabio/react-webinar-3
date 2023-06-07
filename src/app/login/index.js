import {memo, useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import useStore from "../../hooks/use-store"
import useSelector from "../../hooks/use-selector"
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import Navigation from "../../containers/navigation"
import Spinner from "../../components/spinner"
import LoginForm from "../../components/login-form"
import LocaleSelect from "../../containers/locale-select"
import User from '../../containers/user'

function Login() {

   const store = useStore();
   const navigate = useNavigate()

   const select = useSelector(state => ({
      userData: state.user.userData,
      token: state.user.token,
      waiting: state.user.waiting,
      error: state.user.signInError
   }))

   useEffect(() => {
      if(select.userData){
         localStorage.setItem('token', select.token)
         navigate('/profile', {replace: true})
      }
   }, [select.userData])

   const callbacks = {
      signIn: useCallback((login, password) => store.actions.user.signIn(login, password), [store]),
   }

   const {t} = useTranslate();

   return (
      <PageLayout>
         <User/>
         <Head title={t('title')}>
            <LocaleSelect/>
         </Head>
         <Navigation/>
         <Spinner active={select.waiting}>
            <LoginForm signIn={callbacks.signIn} serverError={select.error}/>
         </Spinner>
      </PageLayout>
   )
}

export default memo(Login)