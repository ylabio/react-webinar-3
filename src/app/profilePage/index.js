import {memo, useEffect} from 'react';
import UserPage from '../../containers/user-page'
import useStore from "../../hooks/use-store";

function ProfilePage() {
    const store = useStore();
    const token = localStorage.getItem('token')
    
    useEffect(() => {
      token && store.actions.user.getUserProfile()
    }, [])

    if(token) {
      return <UserPage/>
    } else {
      return window.history.pushState(null, null, '/');
    }
  
  }

  export default memo(ProfilePage);