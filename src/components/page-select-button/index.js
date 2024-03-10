import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageSelectButton({page}) {

  const cn = bem('PageSelectButton');
  return (
    <Link 
      className={cn()}
      to={`/pages/${page}`}
    >
      {page + 1}
    </Link>
  );
}

PageSelectButton.propTypes = {
  page: PropTypes.number,
};

PageSelectButton.defaultProps = {
  page: 0,
}

export default memo(PageSelectButton);