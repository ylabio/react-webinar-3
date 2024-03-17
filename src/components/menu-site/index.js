import {memo, useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link, Navigate} from "react-router-dom";
import './style.css';

function MenuSite({items, onNavigate}) {
  const cn = bem('MenuSite');
  const [login,setLogin] = useState(false);
  const callbacks = {
    // Обработка перехода на страницу входа пользователя
    onFunc: useCallback((item) => {
      onNavigate(item);
      if (item.key == 221 || (item.key == 222 && item.profile == true)) setLogin(true);
    }, []),
  }

  const fItems = (item) => {
    if (item.key == 221 || item.key == 222) {
      return (
        <div key={item.key} className={cn('item')}>
        <button onClick={() => callbacks.onFunc(item)}>{item.title}</button>
        {login && (
        <Navigate to={item.link} replace={true} />
        )}
        </div>
      )
    }
    if (item.key == 223) {
      return (
        <div key={item.key} className={cn('item')}>
          <Link className={cn('link')} to={item.link}>{item.title}</Link>
        </div>
      )
    }
    return '';
    
  }

  return (
    <div className={cn()}>
      {items.map(item => (
        fItems(item)
      )
      )}
    </div>
  )
}

MenuSite.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string,
    profile: PropTypes.bool,
  })),
  onNavigate: PropTypes.func
}

MenuSite.defaultProps = {
  items: [],
  onNavigate: () => {
  }
}

export default memo(MenuSite);
