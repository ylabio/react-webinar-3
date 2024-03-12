import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Loader({isLoading, children}) {
  const cn = bem('Loader');
  return (
    isLoading ?
    <div className={cn()}>
      <p className={cn('paragraph')}>Loading...</p>
    </div> :
    children
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node
}

export default Loader;