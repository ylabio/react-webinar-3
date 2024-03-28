import React, { useEffect, useRef } from "react";

function AutoScroll({ children, isScroll = true }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    isScroll &&
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [children]);
  if (!isScroll) return children;
  return (
    <div style={{ width: "100%" }} ref={scrollRef}>
      {children}
    </div>
  );
}

export default AutoScroll;
