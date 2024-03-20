import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function Menu({items, onNavigate, padding}) {
  const cn = bem('Menu');
  return (
    <ul className={cn({padding})}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => onNavigate(item)}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string,
  })),
  padding: PropTypes.oneOf(['note','small', 'medium']),
  onNavigate: PropTypes.func
}

Menu.defaultProps = {
  items: [],
  onNavigate: () => {
  }
}

export default memo(Menu);
