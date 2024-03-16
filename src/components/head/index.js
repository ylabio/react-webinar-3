import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link, useNavigate } from "react-router-dom";

function Head({title, children, enter, exit, isAuth, user, removeAuthorization, link}) {
  const navigate = useNavigate();
  return (
    <div className='Head'>
      <div className='Head-actions'>
        {isAuth
              ? <>
                  <Link to={link ?? '/'} className='Head-link'>{user?.profile?.name}</Link>
                  <button className='Head-button' onClick={removeAuthorization}>
                    {exit}
                  </button>
                </>
              : <button className='Head-button' onClick={() => navigate('/login')}>
                  {enter}
                </button>
        }
        </div>
            <div className='Head-body'>
        <div className='Head-place'>
          <h1>{title}</h1>
        </div>
        <div className='Head-place'>{children}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  enter: PropTypes.string,
  exit: PropTypes.string,
  isAuth:  PropTypes.bool,
  userName:  PropTypes.string,
  removeAuthorization: PropTypes.func,
  link: PropTypes.string
};

export default memo(Head);
