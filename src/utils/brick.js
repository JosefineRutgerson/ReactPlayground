export class objBrick {
  constructor(key, symbol, selected, cssclass) {
    this.key = key;
    this.symbol = symbol;
    this.selected = selected;
    this.cssclass = cssclass;
  }
}

export function createBricks() {
  const symbols = ["&", "%", "@", "#", "?", "+"];
  const doubled = [...symbols, ...symbols];
  return doubled.map((symbol, index) => ({
    id: `brick-${index}`,
    symbol,
    flipped: false,
    matched: false,
  }));
}
