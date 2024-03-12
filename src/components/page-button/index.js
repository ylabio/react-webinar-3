import {memo, useCallback} from 'react';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function PageButton({number}) {

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
        className={`PageButton + ${(select.selectedPage === number) ? 'PageButton_selected' : ''} `}
        onClick={callbacks.selectPage}
        key={`page_li_${number}`}
      >
        {number}
      </li>
  )
};

export default memo(PageButton);
