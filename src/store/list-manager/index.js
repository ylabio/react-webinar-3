class ListManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  cloneList(list) {
    return list.map(item => ({ ...item }));
  }

  getStateList() {
    return this.cloneList(this.stateManager.getState().list);
  }
}


export { ListManager }
