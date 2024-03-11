import { memo } from "react";

import useDictionary from "../../store/use-dictionary";

import "./style.css";

function Loading() {
  const { currentDictionary } = useDictionary();

  return (
    <div className="Loading">
      {currentDictionary.loading}
    </div>
  );
}

export default memo(Loading);
