import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
// import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function LoginEntry() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

  useInit(() => {
    store.actions.user.load();
  }, [select.user]); 

  const callbacks = {
    // Выход из системы
    signOut: useCallback(() => store.actions.user.signOut(), [store]),
  }

  // const { t } = useTranslate();
  const cn = bem('LoginEntry');

  return (
    <Spinner active={select.waiting}>
      <div className={cn()}>
        <div className={cn('container')}>
          {select.user.profile
            ?
              <>
                <Link to="/profile" className={cn('user')}>{select.user?.profile?.name}</Link>
                <div className={cn('btn')} onClick={callbacks.signOut}>Выход</div>
              </>
            :
              <>
                <Link to="/login" className={cn('btn')}>Вход</Link>
              </>
            }
        </div>
      </div>
    </Spinner>
  );
}

export default memo(LoginEntry);
