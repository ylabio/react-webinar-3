import React, { useEffect, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import PageLayout from "../page-layout";

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
    <PageLayout>
      <div className={cn()}>
        <span>Loading{dots}</span>
      </div>
    </PageLayout>
  );
}

export default React.memo(Loader);
