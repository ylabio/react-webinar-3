import {memo} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import BasketTool from "../basket-tool";
import { useLanguage } from '../../language-context';
import './style.css';

function Controls(props) {
  const { translate } = useLanguage();
  return (
    <div className='Controls'>
      <Link to={'/'} className='Controls-link'>{translate('Главная')}</Link>
      <BasketTool onOpen={props.onOpen} amount={props.amount}
                  sum={props.sum}/>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number  
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default memo(Controls);
