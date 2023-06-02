import { memo, useCallback } from 'react';
import FormLayout from '../../components/form-layout';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import ErrorHandler from '../../components/error-handler';

function LoginContainer() {
  const store = useStore();

  const select = useSelector(state => ({
    authForm: state.auth.authFormData,
    error: state.auth.isError
  }))

  const callbacks = {
    onChangeLogin: useCallback((login) => store.actions.auth.setLogin(login), [store]),
    onChangePassword: useCallback((password) => store.actions.auth.setPassword(password), [store]),
    handleSubmit: useCallback((e) => {
      e.preventDefault();
      store.actions.auth.onLogin();
    }, [store])
  }

  const {t} = useTranslate();

  return (
    <SideLayout padding={'medium'}>
      <FormLayout t={t} handleSubmit={callbacks.handleSubmit}>
        <h3>{t('loginForm.title')}</h3>

        <label htmlFor={'auth-form-login'}>{t('loginForm.labelLogin')}</label>
        <Input labelId={'auth-form-login'} type='text' value={select.authForm.login} onChange={callbacks.onChangeLogin} delay={250} />
          
        <label htmlFor={'auth-form-login'}>{t('loginForm.labelPassword')}</label>
        <Input labelId={'auth-form-password'} type='password' value={select.authForm.password} onChange={callbacks.onChangePassword} delay={250} />

        <ErrorHandler error={select.error} />
      </FormLayout>

    </SideLayout>
  )
}

export default memo(LoginContainer)