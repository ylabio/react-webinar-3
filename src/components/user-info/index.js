import React from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';

const UserInfo = ({ userInfoList, title }) => {
  const cn = bem("User-info");
  return (
    <section className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      <ul className={cn("list")}>
        {userInfoList.map((item, index) => (
          <li className={cn("item")} key={index}>
            {item.title}: <b>{item.info}</b>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserInfo;
