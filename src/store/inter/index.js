import StoreModule from "../module";


class Inter extends StoreModule{
    initState(){
        return{
            lang: 'ru'
        }
    }


    changeLang(lang){
        this.setState({lang})
    }
}

export default Inter