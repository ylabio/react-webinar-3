import StoreModule from "../module";

class Modals extends StoreModule {

  initState() {
    return {
      name: null,
      heightFrame: 400,
      heightList: 0,
      heightListToList: 0,
      scrollHeight: 0,
      vNumForZoom: 776,
      vNumForContainer: 126,   
      vFlag1: 0,
      vFlag2: 1,
      vFlag3: 2,
    }
  }

  open(name) {
    this.setState({
      ...this.getState(),
      name: name,
    }, `Открытие модалки ${name}`);
    //this.setState({name}, `Открытие модалки ${name}`);
  }

  close() {
    this.setState({
      ...this.getState(),
      name: null,
    }, `Закрытие модалки`);
    //this.setState({name: null}, `Закрытие модалки`);
  }

  setheightFrame(height) {
    if (height < 400) return;
    this.setState({
      ...this.getState(),
      heightFrame: height,
    }, 'heightFrame для скролбара');
    if (this.fScrollBarBasket(this.getState().vFlag2) == true) {
      this.setState({
        ...this.getState(),
        heightListToList: this.fHeightContainer(this.getState().vFlag2),
      }, 'heightListToList для скролбара');
    }
    if (this.fScrollBarBasket(this.getState().vFlag1) == true) {
      this.setState({
        ...this.getState(),
        heightFrame: this.fHeightContainer(this.getState().vFlag1),
      }, 'heightFrame максимальный для скролбара');
    }
  }

  setheightList(height) {
    if (height <= 0) return;
    this.setState({
      ...this.getState(),
      heightList: height,
    }, 'heightList для скролбара');
  }

  setheightListToList(height) {
    if (height <= 100) return;
    this.setState({
      ...this.getState(),
      heightListToList: height,
    }, 'heightListToList для скролбара');
  }
  
  setscrollHeight(height) {
    this.setState({
      ...this.getState(),
      scrollHeight: height,
    }, 'scrollHeight для скролбара');
  }

  fHeightContainer (flag) {
    const fAnswer = () => {
      var vHeight = window.innerHeight;
      var vHeightContainer = vHeight - (this.getState().vNumForContainer/this.getState().vNumForZoom)*vHeight;
      if (this.getState().vFlag1 == flag) {
        return (Math.floor(vHeightContainer))
      }
      if (this.getState().vFlag2 == flag) {
        return (Math.floor(vHeightContainer - (this.getState().heightFrame - this.getState().heightList)));
      }
      return 0;
    }
    
    return (fAnswer())
  }

  fScrollBarBasket(flag) {
    if (this.getState().vFlag1 == flag &&
        this.getState().heightFrame >= this.fHeightContainer(this.getState().vFlag1)) {
      return true;
    }
    if (this.getState().vFlag2 == flag &&
        this.getState().heightList >= this.fHeightContainer(this.getState().vFlag2)) {
      return true;
    }
    if (this.getState().vFlag3 == flag &&
        this.getState().scrollHeight > this.getState().heightList &&
        this.getState().heightList >= this.fHeightContainer(this.getState().vFlag2)) {
      return true;
    }
    return false;
  }
}

export default Modals;
