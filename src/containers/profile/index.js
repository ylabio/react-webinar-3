import { memo } from "react"
import useTranslate from "../../hooks/use-translate"
import useSelector from '../../hooks/use-selector';
import ProfileCard from "../../components/profile-card"

function Profile(){

    const select = useSelector(state =>(state.user.user))

    const {t} = useTranslate();
   
    return(
        <> 
        <ProfileCard header={t('menu.profile')} name={select.name} email={select.email} phone={select.phone}   />
        </>
    )
}

export default memo(Profile)