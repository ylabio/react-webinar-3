import {memo} from 'react';
import PropTypes from 'prop-types';
import useSelector from "../../hooks/use-selector";
import { Navigate } from 'react-router-dom';
import ProfilePage from '../../app/profile-page';

function AuthCheck() {  
  
  const select = useSelector(state => ({   
    userName:  state.user.userData.name,
    isAuth: state.user.isAuth, 
    error: state.user.error,
    waiting: state.user.waiting 
  }));

  if (!select.isAuth) {
    return <Navigate to='/login' />   
  } else {
    return <ProfilePage />
  }  
}

AuthCheck.propTypes = {
  children: PropTypes.node,
};

export default memo(AuthCheck);
