import {useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';

function RedirectLogin (props) {

  const router = useNavigate();

  const authLogin = useSelector(state => state.login.authLogin);

  const store = useStore();
 
  useEffect(() => {

    const token = localStorage.getItem('X-Token');
    if (authLogin == false && !!token == false) {
    router('/login', {replace: true});
    } 
  }, [store, authLogin])

  return props.children;
 
}

RedirectLogin.propTypes = {
  children: PropTypes.node,
}

export default memo(RedirectLogin);