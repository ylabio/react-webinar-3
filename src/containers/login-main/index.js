import {memo, useCallback, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import Input from '../../components/input';
import Field from '../../components/field';
import SideLayout from '../../components/side-layout';
import {useLocation, useNavigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelectorForStore from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import {useDispatch,useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import articleCommentsActions from '../../store-redux/article-comments/actions';

function LoginMain() {

  const {t} = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();
  const dispatch = useDispatch();

  useInit(() => {
    store.actions.session.resetErrors();
  })

  const selectRedux = useSelector(state => ({
    login: state.articleComments.login,
    _id: state.articleComments._id,
  }), shallowequal);

  const select = useSelectorForStore(state => ({
    waiting: state.session.waiting,
    errors: state.session.errors,
    exists: state.session.exists,
  }));

  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback((e) => {
      e.preventDefault();
      store.actions.session.signIn(data, () => {
        // Возврат на страницу, с которой пришли
        const back = location.state?.back && location.state?.back !== location.pathname
          ? location.state?.back
          : '/';
        
        if (!window.localStorage.getItem('token')) {
          navigate(back);
        }
        else {
          if (selectRedux.login == true) {
            navigate(`/articles/${selectRedux._id}`);
            dispatch(articleCommentsActions.login(false,''));
          }
          else {
            navigate('/profile');
          }
        }
      });

    }, [store,data,location,select,selectRedux])
  };

  return (
    <>
      {(select.exists == true && localStorage.getItem('token') ?
        navigate('/profile') : ''
      )}
      <SideLayout padding='medium'>
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t('auth.title')}</h2>
          <Field label={t('auth.login')} error={select.errors?.login}>
            <Input name='login' value={data.login} onChange={callbacks.onChange}/>
          </Field>
          <Field label={t('auth.password')} error={select.errors?.password}>
            <Input name='password' type='password' value={data.password}
                   onChange={callbacks.onChange}/>
          </Field>
          <Field error={select.errors?.other}/>
          <Field>
            <button type='submit'>{t('auth.signIn')}</button>
          </Field>
        </form>
      </SideLayout>
    </>
  );
}

export default memo(LoginMain);
