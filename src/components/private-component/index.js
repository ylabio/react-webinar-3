import { Navigate } from 'react-router-dom'
import useSelector from '../../hooks/use-selector'
import PropTypes from 'prop-types'

function PrivateComponent({children}) {
  const select = useSelector(state => ({
    isAuth: state.user.isAuth
  }))
  return select.isAuth ? children : <Navigate to={'/login'}/>
}

PrivateComponent.propTypes = {
  children: PropTypes.element
}

export default PrivateComponent