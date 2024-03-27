import React, { useEffect, useRef } from "react";

function AutoScroll({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [children]);
  return (
    <div style={{ width: "100%" }} ref={scrollRef}>
      {children}
    </div>
  );
}

export default AutoScroll;
