import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";

function LocaleSelect() {
  const { currentLanguage, setCurrentLanguage } = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: "ru", title: "Русский" },
        { value: "en", title: "English" },
      ],
      []
    ),
  };

  return (
    <Select
      onChange={setCurrentLanguage}
      value={currentLanguage}
      options={options.lang}
    />
  );
}

export default memo(LocaleSelect);
