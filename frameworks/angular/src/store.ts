import { random as _random, shuffle as _shuffle } from 'lodash';
// import _shuffle from 'lodash/shuffle';

const rgbColorFactory = (red: number, green: number, blue: number): string => `rgb(${red}, ${green}, ${blue})`;

const randomColor = (lower: number = 0, upper: number = 255): string =>
  rgbColorFactory(
    _random(lower, upper),
    _random(lower, upper),
    _random(lower, upper)
  );

let _currentIndex = 0;

class Color {
  id: number;
  color: string;
  constructor(id: number, color: string){
    this.id = id;
    this.color= color;
  }
}

function generateAmountOfColors(amount: number = 1, startIndex:number = _currentIndex): Array<Color> {
  return Array(amount).fill(null).map((_, i) => new Color(startIndex + (++i), randomColor()));
}

export class Store {
  _colorList: Array<Color>;

  constructor() {
    this._colorList = [];
  }

  get colors(): Array<Color> {
    return this._colorList;
  }

  set colors(colors: Array<Color>) {
    this._colorList = colors;
    if (Array.isArray(colors)) {
      _currentIndex = this._colorList.length;
    }
  }

  appendColors(amount = 1) {
    this.colors = [].concat(
      generateAmountOfColors(amount),
      this.colors
    );
  }

  shuffleColors() {
    this.colors = _shuffle(this.colors);
  }

  sortColorsById() {
    this.colors = [...this.colors].sort((next, curr) => (next.id - curr.id));
  }

  swapColors([idxOne, idxTwo]) {
    const size = this.colors.length;
    if (size > idxOne && size > idxTwo) {
      const newColorOne = this.colors[idxTwo];
      const newColorTwo = this.colors[idxOne];
      const newColors = this.colors.map((clr, idx) => (idx === idxOne) ? (newColorOne) : (idx === idxTwo ? newColorTwo : clr));
      this.colors = newColors;
    }
  }

  deleteColor(colorID: number) {
    const idx = this.colors.findIndex(clr => clr.id === +colorID);

    if (idx !== -1) {
      this.colors = [].concat(
        this.colors.slice(0, idx),
        this.colors.slice(idx + 1)
      );
    }
  }

  updateColor(colorID: number) {
    const idx = this.colors.findIndex(clr => clr.id === +colorID);
    const newColors = [...this.colors]; newColors[idx] = new Color(newColors[idx].id, randomColor());
    this.colors = newColors;
  }

  clearColors() {
    this.colors = [];
  }
}