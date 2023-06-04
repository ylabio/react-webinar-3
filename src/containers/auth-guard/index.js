import { memo } from 'react'
import useSelector from '../../hooks/use-selector';

function AuthGuard({children, fallback}){
  const isAuth = useSelector(state => state.profile.isAuth)

  return isAuth ? children: fallback
}

export default memo(AuthGuard);