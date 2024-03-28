import {memo} from "react";
import {Link, useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

function CommentNav({link, description, t}) {
  const location = useLocation();

  return (
    <div className="CommentNav">
      <Link to={link} state={{back: location.pathname}}>
        {t('comments.signin')}
      </Link>, 
      чтобы иметь возможность {description}
    </div>
  )
}

CommentNav.propTypes = {
  link: PropTypes.string,
  description: PropTypes.string,
  t: PropTypes.func,
}

CommentNav.defaultProps = {
  t: (text) => text,
}

export default memo(CommentNav);