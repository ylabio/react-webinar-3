import {useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';

function RedirectProfile (props) {

  const router = useNavigate();

  const authLogin = useSelector(state => state.login.authLogin);

  const store = useStore();

  useEffect(() => {
   
    const token = localStorage.getItem('X-Token');
    if (authLogin == true && !!token == true) {
    router('/profile', {replace: true});
    }
  }, [store, authLogin])
    
  return props.children;
 
}

RedirectProfile.propTypes = {
  children: PropTypes.node,
}

export default memo(RedirectProfile);