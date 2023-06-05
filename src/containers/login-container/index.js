import { memo, useCallback, useEffect, useState } from 'react';
import FormLayout from '../../components/form-layout';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import ErrorHandler from '../../components/error-handler';
import Spinner from '../../components/spinner';

function LoginContainer() {
  const store = useStore();

  const [formData, setFormData] = useState({
    login: 'test_1',
    password: '123456'
  })

  useEffect(() => {
    store.actions.auth.resetError();
  }, [])

  const select = useSelector(state => ({
    error: state.auth.isError,
    isLoading: state.profile.isLoading,
    isAuth: state.profile.isAuth
  }))

  const callbacks = {
    onChangeLogin: useCallback((login) => {
      setFormData(formData => ({...formData, login}))
    }, [formData]),

    onChangePassword: useCallback((password) => {
      setFormData(formData => ({...formData, password}))
    }, [formData]),

    handleSubmit: useCallback((e) => {
      e.preventDefault();
      
      store.actions.auth.onLogin(formData);
    }, [formData])
  }

  const {t} = useTranslate();

  return (
    !select.isLoading && (
      <SideLayout padding={'medium'}>
        <FormLayout t={t} handleSubmit={callbacks.handleSubmit}>
          <h3>{t('loginForm.title')}</h3>

          <label htmlFor={'auth-form-login'}>{t('loginForm.labelLogin')}</label>
          <Input labelId={'auth-form-login'} type='text' value={formData.login} onChange={callbacks.onChangeLogin} delay={250} />
            
          <label htmlFor={'auth-form-login'}>{t('loginForm.labelPassword')}</label>
          <Input labelId={'auth-form-password'} type='password' value={formData.password} onChange={callbacks.onChangePassword} delay={250} />

          <ErrorHandler error={select.error} />
        </FormLayout>

      </SideLayout>
    )
  )
}

export default memo(LoginContainer)