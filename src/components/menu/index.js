import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


function Menu({title}) {

  const cn = bem('Menu');
  return (
    <div className={cn()}>
      <Link to={'/main'}>{title}</Link>
    </div>
  );
}

Menu.propTypes = {
  title: PropTypes.string
};

Menu.defaultProps = {}

export default memo(Menu);
