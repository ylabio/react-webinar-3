import React from 'react'
import Spinner from '../../components/spinner'
import SideLayout from '../../components/side-layout'
import ProfileCard from '../../components/profile-card'
import useSelector from '../../hooks/use-selector'
import useTranslate from '../../hooks/use-translate'

function ProfileMain() {
    const waiting = useSelector(state => state.profile.waiting)
    const profile = useSelector(state => state.profile.profile)
    const {t} = useTranslate()
    
    return (
        <Spinner active ={waiting}>
                <SideLayout padding={"medium"}>
                    <ProfileCard profile={profile} t={t}/>
                </SideLayout>
        </Spinner>
    )
}

export default ProfileMain