import {memo, useEffect, useContext} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link, useNavigate, useLocation, useHref} from "react-router-dom";


function BasketTool({sum, amount, onOpen, paginate}) {
  const cn = bem('BasketTool');
const navigate = useNavigate();

// const goHome = () => {
//   navigate('/');
// };

  // const { resetPage } = useContext(PaginationContext);
  return (
    <div className={cn()}>
      <Link to={"/"} className={cn('home')} onClick={() => navigate('/')}>Главная</Link>
      {/* <a href='/' className={cn('home')}>Главная</a> */}
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}>Перейти</button>
      {/* <Link to={"*"} className={cn('home')}>Перейти</Link> */}
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
