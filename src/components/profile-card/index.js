import React from "react";
import useTranslate from "../../hooks/use-translate";
import "./style.css";

function ProfileCard(props) {
  const { profile, user } = props;
  const { t } = useTranslate();
  return (
    <section className="profile-wrapper">
      <h2>{t("user.profile")}</h2>
      <div>
        {t("user.name")}:{" "}
        <span>
          <b>{profile.name}</b>
        </span>
      </div>
      <div>
        {t("user.phone")}:{" "}
        <span>
          <b>{profile.phone}</b>
        </span>
      </div>
      <div>
        {t("user.email")}:{" "}
        <span>
          <b>{user.email}</b>
        </span>
      </div>
    </section>
  );
}

export default ProfileCard;
