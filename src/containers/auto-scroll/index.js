import React, { useEffect, useRef } from "react";

function AutoScroll({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  return (
    <>
      <div ref={scrollRef} />
      {children}
    </>
  );
}

export default AutoScroll;
