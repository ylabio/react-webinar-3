import { memo, useCallback, useEffect, useState } from 'react';
import FormInput from '../../components/form-input';
import useTranslate from '../../hooks/use-translate';
import Button from '../../components/button';
import './style.css';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

const field = [
  {
    name: 'login',
    type: 'text',
    label: 'login.form.label.login',
    placeholder: 'login.form.placeholder.login',
  },
  {
    name: 'password',
    type: 'password',
    label: 'login.form.label.password',
    placeholder: 'login.form.placeholder.password',
  },
];

const LoginForm = () => {
  const store = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    isError: state.user.isError,
    error: state.user.error,
  }));

  const callbacks = {
    onChange: useCallback(
      event => {
        setForm({
          ...form,
          [event.target.name]: event.target.value,
        });
      },
      [form, setForm],
    ),
    onSubmit: useCallback(() => {
      store.actions.user.login(form);
    }, [form, store]),
  };

  const { t } = useTranslate();

  useEffect(() => {
    if (select.isAuth) {
      setForm({
        login: '',
        password: '',
      });
      navigate('/');
    }
  }, [select.isAuth]);

  return (
    <div className="LoginForm">
      <div className="LoginForm-container">
        {field.map(item => (
          <FormInput
            key={item.name}
            placeholder={t(item.placeholder)}
            name={item.name}
            type={item.type}
            label={t(item.label)}
            value={form[item.name]}
            onChange={callbacks.onChange}
          />
        ))}
      </div>

      <div className="LoginForm-error">
        {select.isError && t(select.error.map(item => item.message).join('/n'))}
        &nbsp;
      </div>

      <Button
        type="button"
        style="primary"
        title={t('login.form.button')}
        onClick={callbacks.onSubmit}
      />
    </div>
  );
};

export default memo(LoginForm);
