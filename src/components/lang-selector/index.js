import { memo } from "react";
import { codeGenerator } from "../../utils";

function LangSelector({ optionsList, onCange, defaultValue }) {
  const uniqKey = codeGenerator(800);

  return (
    <select onChange={onCange} value={defaultValue || "ru"}>
      {optionsList?.map((el) => (
        <option key={uniqKey()} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
}

export default memo(LangSelector);
