import { cn as bem } from "@bem-react/classname";
import React from "react";
import "./style.css";

const Preloader = () => {
  const cn = bem("Preloader");

  return (
    <div className={cn()}>
      <div className={cn("loader")}>
        <p></p>
      </div>
    </div>
  );
};

export default Preloader;
