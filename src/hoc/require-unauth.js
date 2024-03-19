import React from 'react'
import useSelector from '../hooks/use-selector'
import { Navigate } from 'react-router-dom'

function RequireUnAuth({children}) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if(isAuthenticated){
    return <Navigate to = "/profile"/>
  }
  return children
}

export default RequireUnAuth