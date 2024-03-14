import React, { useEffect, useState } from "react";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function Loader() {
  const cn = bem("Loader");

  const [dots, setDots] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      setDots((dots) => (dots.length > 2 ? "" : dots + "."));
    }, 500);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className={cn()}>
      <span className={cn("title")}>
        Loading<span className={cn("dots")}>{dots}</span>
      </span>
    </div>
  );
}

export default React.memo(Loader);
