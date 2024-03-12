import { memo, useEffect } from "react";
import "./style.css";

function Loader({ isShown, children }) {
  useEffect(() => console.log(isShown), [isShown]);
  return (
    <>
      {isShown && (
        <div className="Loader">
          <div className="Loader-content">Загрузка...</div>
        </div>
      )}
      {!isShown && children}
    </>
  );
}

export default memo(Loader);
