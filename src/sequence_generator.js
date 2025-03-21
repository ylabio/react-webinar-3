export class SequenceGenerator {
  constructor(start) {
    this.current = start;
  }

  generate() {
    return this.current++;
  }
}
