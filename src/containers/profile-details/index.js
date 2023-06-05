import React, { memo } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Column from "../../components/column";

const ProfileDetails = () => {
  const { t } = useTranslate();
  const user = useSelector((state) => state.profile.user);

  return (
    <Column gap="md" p="md">
      <h3>{t("profile.header")}</h3>
      <p>
        <span>{t("profile.name")}</span>{': '}
        <b>{user.profile.name}</b>
      </p>
      <p>
        <span>{t("profile.phone")}</span>{': '}
        <b>{user.profile.phone}</b>
      </p>
      <p>
        <span>{t("profile.email")}</span>{': '}
        <b>{user.email}</b>
      </p>
    </Column>
  );
};

export default memo(ProfileDetails);