import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileCard({ data, t }) {
  const cn = bem("ProfileCard");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{t("profile")}</h2>
      <span className={cn("text")}>
        {t("profile.username")}:{" "}
        <span className={cn("text", { w700: true })}>{data?.username}</span>
      </span>
      <span className={cn("text")}>
        {t("profile.phone")}:{" "}
        <span className={cn("text", { w700: true })}>{data?.phone}</span>
      </span>
      <span className={cn("text")}>
        email: <span className={cn("text", { w700: true })}>{data?.email}</span>
      </span>
    </div>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string,
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
