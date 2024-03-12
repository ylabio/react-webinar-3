import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Card extends StoreModule {

    constructor(store, name) {
      super(store, name);
      this.generateCode = codeGenerator(0)
    }
  
    initState() {
        return {
          dataCard: {},
          errorMessage: ''
        }
      }
    
      async loadCard(id) {
        this.setState({
          dataCard: {},
        });
    
        try {
          const responseData = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
          const data = await responseData.json();
    
          this.setState({
            dataCard: data.result,
            errorMessage: ''
          });
    
        } catch (e) {
          this.setState({
            dataCard: {},
            errorMessage: 'Данные не удалось загрузить'
          });
        }
      }
  }
  
  export default Card;
  