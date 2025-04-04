import { memo } from 'react';
import './style.css'

function LimitSelect({ limit = 10, setLimit = () => {} }) {
  return (
    <div>
        <select className='limitselect' onChange={(e) => setLimit(e.target.value)} defaultValue={limit}>
            <option value={5}>Количество товаров на странице: 5</option>
            <option value={10}>Количество товаров на странице: 10</option>
            <option value={20}>Количество товаров на странице: 20</option>
        </select>
    </div>
  );
}

export default memo(LimitSelect);
