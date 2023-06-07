import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function Menu({items, onNavigate, clearError}) {
  const cn = bem('Menu');
  function handleClick(item){
    onNavigate(item)
    clearError()
  }
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => handleClick(item)}>{item.title}</Link>
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
  onNavigate: PropTypes.func
}

Menu.defaultProps = {
  items: [],
  onNavigate: () => {}
}

export default memo(Menu);
