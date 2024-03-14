import { memo } from "react";
import { codeGenerator } from "../../utils";

function LangSelector({ optionsList, onCange, defaultValue }) {
  const uniqKey = codeGenerator(800);

  const callbacks = {
    onChange: (event) => onCange(event),
  };

  return (
    <select onChange={callbacks.onChange} value={defaultValue || "ru"}>
      {optionsList?.map((el) => (
        <option key={uniqKey()} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
}

export default memo(LangSelector);
