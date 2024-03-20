import { useNavigate } from 'react-router-dom'
import useInit from './use-init'

export function useAuthorized(url, user) {
  const navigate = useNavigate()
  useInit(() => {
    if (!user) {
      navigate(url)
    }
  }, [user])
}