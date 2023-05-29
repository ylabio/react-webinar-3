import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';


function ProductOption(props) {
  const cn = bem('ProductInfo');
  return (
    <div className={cn()}>
      {props.option}: <span className={cn('value')}>{props.value}</span>
    </div>
  )
}

ProductOption.propTypes = {
  option: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired
}

export default memo(ProductOption);