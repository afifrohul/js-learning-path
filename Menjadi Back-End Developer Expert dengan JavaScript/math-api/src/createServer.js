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

  return app;
};

export default createServer;