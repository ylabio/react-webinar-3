import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageSelectButton({page, active}) {

  const cn = bem('PageSelectButton');
  if (page === '…') {
    return (
      <span className={cn('ellipsis')}>{page}</span>
    )
  }
  return (
    <Link
      className={active ? cn('active') : cn()}
      to={`/pages/${page}`}
    >
      {page}
    </Link>
  );
}

PageSelectButton.propTypes = {
  page: PropTypes.string,
  active: PropTypes.bool,
};

PageSelectButton.defaultProps = {
  page: 1,
  active: false,
}

export default memo(PageSelectButton);