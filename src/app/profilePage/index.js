import { memo, useEffect, useState } from 'react'
import UserPage from '../../containers/user-page'
import useStore from '../../hooks/use-store'

function ProfilePage() {
  const store = useStore()
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      store.actions.user.getUserProfile()
    } else {
      window.location.href = '/login'
    }
  }, [])

  return <UserPage />
}

export default ProfilePage
