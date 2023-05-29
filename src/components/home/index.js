import {memo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import useStore from "../../store/use-store";
import "./style.css";

function Home() {
  const store = useStore();

  const callbacks = {
    setCurrentPage: useCallback(page => store.actions.catalog.setCurrentPage(page), [store]),
  }

  const cn = bem('Home');

  return (
    <Link onClick={() => callbacks.setCurrentPage(1)} className={cn('link')} to={`/`}>Главная</Link>
  );
}

export default memo(Home);