import { Link } from 'react-router-dom';
import BasketTool from '../basket-tool';
import './style.css';

function Navigation({ amount, sum, onOpenBasket }) {
  return (
    <div className='Navigation'>
      <Link className='Navigation_link' to='/'>Главная</Link>
      <BasketTool onOpen={onOpenBasket} sum={sum} amount={amount} />
    </div>
  );
}



export default Navigation;
