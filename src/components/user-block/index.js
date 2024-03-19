import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function UserBlock(props) {
  const cn = bem('UserBlock');
  return (
    <div className={cn()}>
      {props.user && <Link className={cn('link')} to={props.link}>{props.user.profile.name}</Link>}
      <button className={cn('btn')} onClick={props.onClick}>
        {props.btnLabel}
      </button>
    </div>
  )
}

UserBlock.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    })
  }),
  onClick: PropTypes.func,
  btnLabel: PropTypes.string,
  link: PropTypes.string,
}

UserBlock.defaultProps = {
  onClick: () => {
  }
}

export default memo(UserBlock);
