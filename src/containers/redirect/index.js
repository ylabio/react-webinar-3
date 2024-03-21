import {useLocation, useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';

function Redirect (props) {

  const router = useNavigate();

  const authLogin = useSelector(state => state.login.authLogin);
  const location = useLocation();
  const store = useStore();
 
  useEffect(() => {

    if (authLogin == props.login) {
    router(props.link, {replace: true});
    } 
  }, [store, authLogin, location, router])
  
  if(!authLogin == props.login) {
    return props.children;
  }
 
 
}

Redirect.propTypes = {
  children: PropTypes.node,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  login: PropTypes.bool
}

export default memo(Redirect);