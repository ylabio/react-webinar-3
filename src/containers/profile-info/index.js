import UserInfo from "../../components/user-info";
import useSelector from "../../hooks/use-selector";
import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";


function ProfileInfo(){
  const select = useSelector(state => ({
    userData: state.profile.userData,
    waiting: state.profile.waiting
  }));

  const {t} = useTranslate();

  return (
  <Spinner active={select.waiting}>
    {!select.waiting && <UserInfo user={select.userData} t={t}/>}
    </Spinner>
  )
}

export default memo(ProfileInfo)