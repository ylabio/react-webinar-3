import { useCallback, useState } from 'react';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { cn as bem } from '@bem-react/classname';

import { LANGUAGES } from '../../lang/languages';

import './style.css';

function ItemsSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const store = useStore();

  const cn = bem('ItemsSelector');

  const select = useSelector(state => ({
    itemsPerPage: state.catalog.itemsPerPage,
    pageItemsCountArray: state.catalog.pageItemsCountArray,
    lang: state.language.currentLang,
    currentPage: state.catalog.currentPage
  }));

  const callbacks = {
    // Обновление страницы
    updateItemsCount: useCallback(
      itemsCount => {
        store.actions.catalog.updateProductData(itemsCount);
        setIsOpen(false);
      },
      [store],
    ),
  };

  const getActiveStyleClass = (value, currentValue) => {
    return currentValue === value ? ' active-select' : '';
  };

  return (
    <div className={cn()}>
      <div>{LANGUAGES[select.lang].select}</div>
      <div className={cn('container')}>
        <div className={cn('default')}>
          <div className={cn('current-item')} onClick={() => setIsOpen(prev => !prev)}>
            {select.itemsPerPage}
          </div>
        </div>

        {isOpen && (
          <div className={cn('list')}>
            {select.pageItemsCountArray.map((item, index) => (
              <div
                key={`selectItemKey-${index}`}
                onClick={() => callbacks.updateItemsCount(item)}
                className={`${cn('item')}${getActiveStyleClass(item, select.itemsPerPage)}`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemsSelector;
