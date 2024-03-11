import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      lang: "",
    };
  }
  changeLang() {
    if (this.getState().lang == "Рус")
      this.setState({
        ...this.getState(),
        lang: "Eng",
      });
    else
      this.setState({
        ...this.getState(),
        lang: "Рус",
      });
  }
}

export default Language;
