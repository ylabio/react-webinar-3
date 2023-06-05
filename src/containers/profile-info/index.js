import React, {memo} from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import ProfileLayout from "../../components/profile-layout";
import ProfileDescriptionItem from "../../components/profile-description-item";

const ProfileInfo = () => {

  const {t} = useTranslate();

  const user = useSelector((state) => state.profile.user);

  return (
    <ProfileLayout>
      <h2>{t('profile.header')}</h2>
      <ProfileDescriptionItem title={t('profile.name')} description={user.profile.name}/>
      <ProfileDescriptionItem title={t('profile.phone')} description={user.profile.phone}/>
      <ProfileDescriptionItem title={t('profile.email')} description={user.email}/>
    </ProfileLayout>
  );
};

export default memo(ProfileInfo);