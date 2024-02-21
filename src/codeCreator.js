class CodeCreator {
  constructor(list) {
    this.lastCode = this.getLastCode() || list.length;
  }
  getLastCode = () => parseInt(sessionStorage.getItem("lastCode"), 10);
  setLastCode = (code) => sessionStorage.setItem("lastCode", code);
  createNewCode = () => {
    const newCode = (this.lastCode += 1);
    this.setLastCode(newCode);
    return newCode;
  };
}

export default CodeCreator;
