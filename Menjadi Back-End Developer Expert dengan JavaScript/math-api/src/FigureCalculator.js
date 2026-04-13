class FigureCalculator {
  constructor(mathBasic) {
    this._mathBasic = mathBasic;
  }

  calculateRectanglePerimeter(...args) {
    if (args.length !== 2) {
      throw Error('Fungsi hanya menerima dua parameter');
    }

    const [length, width] = args;

    if (typeof length !== 'number' || typeof width !== 'number') {
      throw Error('Fungsi hanya menerima parameter number');
    }

    return this._mathBasic.multiply(2, this._mathBasic.add(length, width));
  }

  calculateRectangleArea(...args) {
    if (args.length !== 2) {
      throw Error('Fungsi hanya menerima dua parameter');
    }

    const [length, width] = args;

    if (typeof length !== 'number' || typeof width !== 'number') {
      throw Error('Fungsi hanya menerima parameter number');
    }

    return this._mathBasic.multiply(length, width);
  }

  calculateTrianglePerimeter(...args) {
    if (args.length !== 3) {
      throw Error('Fungsi hanya menerima 3 parameter');
    }

    const [sideA, sideB, base] = args;

    if (typeof sideA !== 'number' || typeof sideB !== 'number' || typeof base !== 'number'
    ) {
      throw Error('Fungsi hanya menerima parameter number');
    }

    return this._mathBasic.add(this._mathBasic.add(sideA, sideB), base);
  }

  calculateTriangleArea(...args) {
    if (args.length !== 2) {
      throw Error('Fungsi hanya menerima 2 parameter');
    }

    const [base, height] = args;

    if (typeof base !== 'number' || typeof height !== 'number') {
      throw Error('Fungsi hanya menerima parameter number');
    }

    return this._mathBasic.divide(this._mathBasic.multiply(base, height), 2);
  }
}

export default FigureCalculator;

