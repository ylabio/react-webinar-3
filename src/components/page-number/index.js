import {memo, useCallback} from 'react';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import {cn as bem} from '@bem-react/classname';

function PageNumber({number}) {
  const cn = bem('PageNumber');
  const store = useStore();
  const select = useSelector((state) => ({
    selectedPage: state.pagination.selectedPage
  }));
  const callbacks = {
    // Переход на другую страницу
    selectPage: useCallback(() => {
      store.actions.catalog.load(number);
      store.actions.pagination.selectPage(number);
    },[]),
  }

  return(
      <li
        className={`${cn()} + ${(select.selectedPage === number) ? cn({selected: true}) : ''} `}
        key={`page_li_${number}`}
      >
        <button
          className={`${cn('button')} + ${(select.selectedPage === number) ? cn('button', {selected: true}) : ''} `}
          onClick={callbacks.selectPage}
        >
          {number}
        </button>
      </li>
  )
};

export default memo(PageNumber);
