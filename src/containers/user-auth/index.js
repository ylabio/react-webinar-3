import {memo, useEffect, useState} from 'react';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';

function UserAuth({element, redirectTo}) {
  const [success, setSuccess] = useState(false);
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.user.auth()
      .then(({success, error}) => {
        if (success) {
          setSuccess(true);
        } else {
          setSuccess(false)
          navigate(redirectTo)
        }
      })
  }, [])

  return (
    <>
      {success ? element : <Spinner active={true}></Spinner>}
    </>
  )
}

export default memo(UserAuth);
