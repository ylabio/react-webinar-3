import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

// В Header используются слоты, которые позволят подменять содержимое шапки в зависимости от страницы
function Header(props) {
  const cn = bem('Header');
  return (
    <header className={cn()}>
      <div className={cn('container')}>
        <div className={cn('left')}>{props.left}</div>
        <div className={cn('center')}>{props.center}</div>
        <div className={cn('right')}>{props.right}</div>
      </div>
    </header>
  )
}

export default Header;

Header.propTypes = {
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node
}
