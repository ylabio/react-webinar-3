import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function BreadCrumbs({ title, link }) {
  const cn = bem('BreadCrumbs');
  return (
    <div className={cn()}>
      <Link className={cn('title')} to={link}>{title}</Link>
    </div>
  );
}

BreadCrumbs.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string
};

BreadCrumbs.defaultProps = {
  title: ''
}

export default memo(BreadCrumbs);
