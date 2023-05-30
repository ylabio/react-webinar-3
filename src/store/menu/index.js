import StoreModule from "../module";

class  Menu extends StoreModule {
   initState() {
      return (
        [
         {
            text: "Главная",
            link: "/",
         }
        ]
      )
    }
}

export default Menu