import { memo } from 'react';
import useSelector from '../../store/use-selector';
import Row from '../row';
import './style.css';

function Table() {
  const select = useSelector(state => ({
    product: state.product,
    language: state.language.lang,
  }));

  return (
    <table className='Table'>
      <tbody>
        <Row 
          title={select.language === 'ru' ? "Страна производитель: " : "Made in: "} 
          value={select.product.country}
        />
        <Row 
          title={select.language === 'ru' ? "Категория: " : "Cathegory: "}
          value={select.product.category}
        />
        <Row 
          title={select.language === 'ru' ? "Год выпуска: " : "Production Year: "} 
          value={select.product.year}
        />
      </tbody>
    </table>
  );
}

export default memo(Table);