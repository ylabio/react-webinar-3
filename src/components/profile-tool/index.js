import {memo} from "react";
import PropTypes from 'prop-types';
import SideLayout from "../side-layout";
import {Link} from "react-router-dom";
import './style.css';

function BasketTool({isLoggedin, path, onClick, userName}) {
  return (
    <SideLayout side={'end'} padding={'small-medium'}>
      <Link to={path}>{userName}</Link>
      <button onClick={onClick}>{isLoggedin ? 'Выход' : 'Вход'}</button>
    </SideLayout>
  );
}

BasketTool.propTypes = {
  isLoggedin: PropTypes.bool,
  path: PropTypes.string,
  onClick: PropTypes.func,
  userName: PropTypes.string
};

BasketTool.defaultProps = {
  onClick: () => {},
}

export default memo(BasketTool);
