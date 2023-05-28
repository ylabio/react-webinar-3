import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      pageLimit: 10,
      itemOrder: 0,
      totalPages: 0,
      currentPage: 1,
      pageNeighbours: 1,      
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${this.getState().pageLimit}&skip=${this.getState().itemOrder}&fields=items(_id, title, price),count`);   
    const json = await response.json();    
    this.setState({
       ...this.getState(),
       list: json.result.items,
       totalPages: json.result.count
    }, 'Загружены товары из АПИ');  
  }
  
  async selectedPage(page) {       
    let itemOrder = (page - 1) * this.getState().pageLimit
    const response = await fetch(`/api/v1/articles?limit=${this.getState().pageLimit}&skip=${itemOrder}&fields=items(_id, title, price),count`);   
    const json = await response.json();    
    this.setState({
       ...this.getState(),
       list: json.result.items,  
       itemOrder: itemOrder,   
       currentPage: page, 
    }, 'Выбор страницы');     
  }

  fetchNumbersPage() {      

    const totalPagesCount = Math.ceil(this.getState().totalPages / this.getState().pageLimit)

    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];
    
        while (i <= to) {
            range.push(i);
            i += step;
        }
    
        return range;
    }

    const totalNumbers = (this.getState().pageNeighbours * 2) + 3;     
    const totalBlocks = totalNumbers + 2;

    if (totalPagesCount > totalBlocks) {
        const startPage = Math.max(2, this.getState().currentPage - this.getState().pageNeighbours);
        const endPage = Math.min(totalPagesCount - 1, this.getState().currentPage + this.getState().pageNeighbours);  
                
        let pages = () => {
          if (this.getState().currentPage === 1) {
            return range(startPage, endPage + 1)
          } else if (this.getState().currentPage === totalPagesCount) {
            return range(startPage - 1, endPage)
          }
          return range(startPage, endPage)
        }     

        let leftSiblingsIndex = this.getState().currentPage - 1;
        let rightSiblingsIndex = totalPagesCount - this.getState().currentPage;      

        let leftShowDots = leftSiblingsIndex > 2;
        let righthowDots = rightSiblingsIndex > 2;

        if (!leftShowDots && righthowDots) {
          return [1, ...pages(), '...' , totalPagesCount];
        } else if (leftShowDots && !righthowDots) {
          return [1, '...' , ...pages(), totalPagesCount];
        }        
        return [1, '...', ...pages(), '...' , totalPagesCount];
    }
    return range(1, totalPagesCount);
  }
}

export default Catalog;
