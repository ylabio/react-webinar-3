import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function AuthTool(props) { 

  const cn = bem('AuthTool');
  
  return (
    <div className={cn()}>
     
      {props.isAuth ? 
        <>
          <Link to={'/profile'} className={cn('username')}>{props?.userName}</Link>
          <button onClick={props.logout}>Выход</button>
        </>         
        : 
        <button onClick={props.handleOnClick}>Вход</button>
      }      
    </div>
  );
}

// AuthTool.propTypes = {
//   onOpen: PropTypes.func.isRequired,
//   sum: PropTypes.number,
//   amount: PropTypes.number,
//   t: PropTypes.func
// };

// AuthTool.defaultProps = {
//   onOpen: () => {},
//   sum: 0,
//   amount: 0,
//   t: (text) => text
// }

export default memo(AuthTool);
