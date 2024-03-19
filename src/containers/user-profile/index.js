import {memo, useEffect} from "react";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import UserInfo from "../../components/user-info";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function UserProfile() {

  const {t} = useTranslate();

  const content = {
    title: t('profile.title'),
    name: t('profile.name'),
    phone: t('profile.phone')
  }

  const store = useStore();

  const select = useSelector(state => ({
    profile: state.profile.profile,
    profileError: state.profile.profileError
  }));

  useEffect(() => {
    store.actions.profile.getProfile()
  }, [])

  return (
    <SideLayout side='start'>
      {(!select.profileError && select.profile) && <UserInfo user={select.profile} {...content} />}
    </SideLayout>
  )
}

export default memo(UserProfile);
