import React, { useCallback } from 'react'
import SideLayout from '../../components/side-layout'
import { useNavigate } from 'react-router-dom'
import useSelector from '../../hooks/use-selector'
import ProfileMenu from '../../components/profile-menu'
import useStore from '../../hooks/use-store'
import Spinner from '../../components/spinner'
import useTranslate from '../../hooks/use-translate'

function HeadProfileInfo() {
    const navigate = useNavigate()
    const store = useStore();
    const isAuthenticated = useSelector(state => state.profile.isAuthenticated)
    const profile = useSelector(state => state.profile.profile)
    const waiting = useSelector(state => state.profile.waiting)
    const {t} = useTranslate();
    const callbacks = {
        loginCallback : useCallback(() => navigate("/login"),[]),
        logoutCallback : useCallback(() => {store.actions.profile.logout()},[])
    }

    return (
        <Spinner active = {waiting}>
        <SideLayout  padding = "small" side = "end">
            <ProfileMenu loginHandler= {callbacks.loginCallback} logoutHandler ={callbacks.logoutCallback} profile = {profile} isAuthenticated ={isAuthenticated} t = {t}/>    
        </SideLayout>
        </Spinner>
    )
}

export default HeadProfileInfo