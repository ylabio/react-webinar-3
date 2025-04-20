import {memo, useCallback, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import {useLocation, useNavigate} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import Button from '../button';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ReplyForm(props) {
  const {t} = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();

  const cn = bem('ReplyForm');

  useInit(() => {
    // store.actions.session.resetErrors();
  });

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    errors: state.session.errors,
  }));

  const [data, setData] = useState({
    // login: '',
    // password: '',
    text: '',
    _id: props._id
  });

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        store.actions.session.signIn(data, () => {
          // Возврат на страницу, с которой пришли
          const back =
            location.state?.back && location.state?.back !== location.pathname
              ? location.state?.back
              : '/';
          navigate(back);
        });
      },
      [data, location.state],
    ),
  };

  return (
    <>
      <form className={cn()} onSubmit={callbacks.onSubmit}>
        <p className={cn('title')}>{props.title}</p>
        <textarea className={cn('textarea')} name={'comment'} placeholder={props.placeholder}></textarea>
        <div className={cn('footer')}>
          <Button style="primary" type="submit" title="Отправить" />
          <Button style="outline" type="button" title="Отмена" onClick={props.onChancel}/>
        </div>
      </form>
    </>
  );
}

export default memo(ReplyForm);
