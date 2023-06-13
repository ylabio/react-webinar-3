export default function marginCalc(margin, lvl, maxLvl=10) {

    if(lvl > maxLvl) {
      return margin * maxLvl
    }
    else {
      return margin * lvl
    }
    
  }