import StoreModule from "../module";

class Pagination extends StoreModule {
    
    pageNums() {
        const arrayPages = [];
        for(let i = 1; i <= Math.ceil(543 / 10); i++) {
            arrayPages.push(i);
        }
        return arrayPages;
    }
    
}

export default Pagination;