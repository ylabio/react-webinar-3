import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

function CommentHint({link, text}) {
  return (
    <div className="CommentHint">
      <Link to={link}>Войдите</Link>, чтобы иметь возможность {text}
    </div>
  )
}

CommentHint.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
}

export default memo(CommentHint);