import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function ProfileInfo({ title, data }) {
  const cn = bem("ProfileInfo");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}> {title}</h2>
      {data.map((item, index) => {
        return (
          <div key={index} className={cn("item")}>
            <span className={cn("label")}>{item.label}: </span>
            <span className={cn("value")}>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

ProfileInfo.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

ProfileInfo.defaultProps = {
  title: "Profile",
  data: [
    {
      label: "name",
      value: "User",
    },
  ],
};

export default memo(ProfileInfo);
