import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

export function LinkProduct(props) {
   
  return (
    <>
  <Link className='Links' to={props.to}><p onClick={props.closeModal} className='p-title'>{props.title}</p></Link> 
    </>
  ) 
}


LinkProduct.propTypes = {
  langData: PropTypes.object,
}

export default LinkProduct;