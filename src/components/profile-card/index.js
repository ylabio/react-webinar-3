import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileCard({ name, email, phone, t }) {
  const cn = bem("ProfileCard");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("profile")}</h2>
      <span className={cn("text")}>
        {t("profile.username")}:{" "}
        <span className={cn("text", { w700: true })}>{name}</span>
      </span>
      <span className={cn("text")}>
        {t("profile.phone")}:{" "}
        <span className={cn("text", { w700: true })}>{phone}</span>
      </span>
      <span className={cn("text")}>
        email: <span className={cn("text", { w700: true })}>{email}</span>
      </span>
    </div>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  data: {},
  t: (text) => text,
};

export default memo(ProfileCard);
