import React from "react";

export default function Actions({ text, btnText, onClick, extraInfo }) {
  return (
    <>
      <p>
        {text} <span>{extraInfo}</span>
      </p>
      <button onClick={onClick}>{btnText}</button>
    </>
  );
}
