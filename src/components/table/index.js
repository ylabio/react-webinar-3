import { memo } from 'react';
import useSelector from '../../store/use-selector';
import Row from '../row';
import './style.css';

function Table() {
  const select = useSelector(state => ({
    product: state.product,
  }));

  return (
    <table className='Table'>
      <tbody>
        <Row title="Страна производитель:" value={select.product.country}/>
        <Row title="Категория:" value={select.product.category}/>
        <Row title="Год выпуска:" value={select.product.year}/>
      </tbody>
    </table>
  );
}

export default memo(Table);