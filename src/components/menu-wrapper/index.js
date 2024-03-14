import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Menu from '../menu';
import BasketTool from '../basket-tool';

function MenuWrapper(props) {

  const cn = bem('MenuWrapper');

  return (
    <div className={cn()}>
      <Menu language={props.language}/>
      <BasketTool onOpen={props.onOpen} amount={props.amount} sum={props.sum} language={props.language}/>
    </div>
    )
}

MenuWrapper.propTypes = {
  amount: PropTypes.number,
  sum: PropTypes.number,
  language: PropTypes.string,
  onOpen: PropTypes.func,
}

MenuWrapper.defaultProps = {
  onOpen: () => {},
}

export default memo(MenuWrapper);
