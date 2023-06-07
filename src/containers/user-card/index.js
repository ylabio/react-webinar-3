import {memo, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import useSelector from "../../hooks/use-selector"
import Spinner from '../../components/spinner';
import ProfileCard from "../../components/profile-card"

function UserCard() {

    const navigate = useNavigate()

    const select = useSelector(state => ({
      userData: state.user.userData,
      waiting: state.user.waiting,
    }))

    useEffect(() => {
      if(!select.userData){
        navigate('/auth', {replace: true})
      }
    }, [select.userData])
   return (
    <Spinner active={select.waiting}>
        <ProfileCard user={select.userData}/>
    </Spinner>
   )
}

export default memo(UserCard);