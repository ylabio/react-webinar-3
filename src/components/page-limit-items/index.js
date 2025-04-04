import { useState, useEffect, memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import './style.css';

function PageLimitItems() {
  const [currentLimit, setCurrentLimit] = useState(10);
  const store = useStore();
  const cn = bem('PageLimitItems');

  useEffect(() => {
    store.actions.catalog.setLimit(currentLimit);
  }, [currentLimit]);

  const renderPageButton = (limit, isActive) => {
    return (
      <button
        key={limit}
        className={cn('button', { 'active': isActive })}
        onClick={() => handleClickButton(limit)}
      >
        {limit}
      </button>
    );
  };

  const handleClickButton = (limit) => {
    if (limit === currentLimit) return;
    setCurrentLimit(limit)
  }

  return (
    <div className={cn()}>
      <span className={cn('title')}>Показывать по: </span>
      {renderPageButton(5, 5 === currentLimit)}
      {renderPageButton(10, 10 === currentLimit)}
      {renderPageButton(20, 20 === currentLimit)}
    </div>
  );
}

export default memo(PageLimitItems);
