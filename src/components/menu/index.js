import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import useStore from "../../hooks/use-store";

function Menu({items, onNavigate}) {

  const store = useStore();

  const callbacks = {
    clearError: useCallback(() => store.actions.user.clearError(), [store]),
  }

  function onNavigateHandler(item) {
    onNavigate(item);
    callbacks.clearError();
  } 

  const cn = bem('Menu');
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => onNavigateHandler(item)}>{item.title}</Link>
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
