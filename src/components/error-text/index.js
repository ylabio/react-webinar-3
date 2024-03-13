import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ErrorText({ children }) {
  const cn = bem('Error');

  return <div className={cn()}>{children}</div>;
}

Error.propTypes = {
  children: PropTypes.node,
};

export default ErrorText;
