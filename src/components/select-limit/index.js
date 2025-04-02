import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';


// ?TODO: [REFACTOR] Создать Универсальный <select>
function SelectLimit({ changeLimit }) {
  const cn = bem('Limit');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    changeLimit(+selectedValue);
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>Показать на странице</div>
      <select className={cn('select')} onChange={handleChange} defaultValue="10">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

export default memo(SelectLimit);
