import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import NavBar from "../nav-bar";
import BasketTool from "../basket-tool";


function Panel(props) {
  return (
    <div className='Panel'>
      <NavBar lang={props.lang} paginate={props.paginate}/>
      <BasketTool onOpen={props.onOpen} sum={props.sum} amount={props.amount} lang={props.lang}/>
    </div>
  );
}

Panel.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string,
  paginate: PropTypes.func.isRequired
};

Panel.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: 'ru',
  paginate: () => {},
}

export default memo(Panel);
