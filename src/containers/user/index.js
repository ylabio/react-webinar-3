import {memo, useCallback} from "react"
import {useNavigate} from "react-router-dom"
import useStore from "../../hooks/use-store"
import useSelector from "../../hooks/use-selector"
import ProfileTool from "../../components/profile-tool"
import Spinner from '../../components/spinner';

function User() {

   const store = useStore()
   const navigate = useNavigate()

   const select = useSelector(state => ({
      user: state.user,
      username: state.user.userData?.profile.name,
      token: state.user.token,
      waiting: state.user.waiting
   }))

   const callbacks = {
      logout: useCallback(async() => {
         await store.actions.user.logOut(select.token)
         store.actions.user.userStateClose()
         localStorage.removeItem('token')
      }, [store, select.token]),
   }
   return (
      <Spinner active={select.waiting}>
         <ProfileTool link='/profile' username={select.username} onLogout={callbacks.logout} onSign={() => navigate('/auth')}/>
      </Spinner>
   )
}

export default memo(User);
