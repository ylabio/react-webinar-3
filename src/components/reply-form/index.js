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
  });

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    errors: state.session.errors,
  }));

  const [data, setData] = useState({
    text: '',
    parent: { _id: props._id, _type: props.type }
  });

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value, name) => {
      setData(prevData => ({ ...prevData, [name]: value }));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        props.onSendReply(data);
        setData(prevData => ({ ...prevData, text: '' }));
        props.onChancel();
      },
      [data, props.onSendReply, props.onChancel],
    ),
  };

  return (
    <>
      <form className={cn()} onSubmit={callbacks.onSubmit}>
        <p className={cn('title')}>{props.title}</p>
        <textarea className={cn('textarea')} name={'comment'} placeholder={props.placeholder} value={data.text} onChange={e => callbacks.onChange(e.target.value, 'text')}></textarea>
        <div className={cn('footer')}>
          <Button style="primary" type="submit" title="Отправить" />
          <Button style="outline" type="button" title="Отмена" onClick={props.onChancel}/>
        </div>
      </form>
    </>
  );
}

export default memo(ReplyForm);
