import {memo} from 'react'
import SideLayout from '../../components/side-layout'
import ProfileLayout from '../../components/profile-layout'
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import useTranslate from "../../hooks/use-translate";

function ProfileContainer() {
  const {t} = useTranslate();
  
  const select = useSelector(state => ({
    isLoading: state.auth.isLoading,
    userData: state.auth.userData,
  }));

  return (
    <SideLayout padding={'medium'}>
      <Spinner active={select.isLoading}>
        <ProfileLayout userData={select.userData} t={t}/>
      </Spinner>
    </SideLayout>
  )
}

export default memo(ProfileContainer)