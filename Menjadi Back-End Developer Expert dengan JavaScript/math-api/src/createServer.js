import express from 'express';

const createServer = ({ mathBasic }) => {
  const app = express();
  app.get('/add/:a/:b', (request, response) => {
    const { a, b } = request.params;
    const value = mathBasic.add(Number(a), Number(b));
    response.json({ value });
  });

  app.get('/subtract/:a/:b', (request, response) => {
    const { a, b } = request.params;
    const value = mathBasic.subtract(Number(a), Number(b));
    response.json({ value });
  });

  app.get('/multiply/:a/:b', (request, response) => {
    const { a, b } = request.params;
    const value = mathBasic.multiply(Number(a), Number(b));
    response.json({ value });
  });

  app.get('/divide/:a/:b', (request, response) => {
    const { a, b } = request.params;
    const value = mathBasic.divide(Number(a), Number(b));
    response.json({ value });
  });

  app.get('/rectangle/perimeter/:length/:width', (request, response) => {
    const { length, width } = request.params;
    const value = mathBasic.multiply(2, mathBasic.add(Number(length), Number(width)));
    response.json({ value });
  });

  app.get('/rectangle/area/:length/:width', (request, response) => {
    const { length, width } = request.params;
    const value = mathBasic.multiply(Number(length), Number(width));
    response.json({ value });
  });

  app.get('/triangle/perimeter/:sideA/:sideB/:base', (request, response) => {
    const { sideA, sideB, base } = request.params;
    const value = mathBasic.add(mathBasic.add(Number(sideA), Number(sideB)), Number(base));
    response.json({ value });
  });

  app.get('/triangle/area/:base/:height', (request, response) => {
    const { base, height } = request.params;
    const value = mathBasic.divide(mathBasic.multiply(Number(base), Number(height)), 2);
    response.json({ value });
  });

  return app;
};

export default createServer;