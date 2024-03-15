import {memo} from "react";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import useAuth from "../../hooks/use-auth";
import UserInfo from "../../components/user-info";

function UserProfile() {

  const {user} = useAuth();

  const {t} = useTranslate();

  const content = {
    title: t('profile.title'),
    name: t('profile.name'),
    phone: t('profile.phone')
  }

  return (
    <SideLayout side='start'>
      {user && <UserInfo user={user} {...content} />}
    </SideLayout>
  )
}

export default memo(UserProfile);
