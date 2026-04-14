import request from 'supertest';
import createServer from './CreateServer.js';
import MathBasic from './MathBasic.js';

describe('A HTTP Server', () => {
  describe('when GET /add', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyAdd = vi.spyOn(MathBasic, 'add');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/add/${a}/${b}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(30); // a + b
      expect(spyAdd).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /subtract', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 5;
      const spySubtract = vi.spyOn(MathBasic, 'subtract');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/subtract/${a}/${b}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(5); // a - b
      expect(spySubtract).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /multiply', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 5;
      const spyMultiply = vi.spyOn(MathBasic, 'multiply');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/multiply/${a}/${b}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(50); // a * b
      expect(spyMultiply).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /divide', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 5;
      const spyDivide = vi.spyOn(MathBasic, 'divide');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/divide/${a}/${b}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(2); // a / b
      expect(spyDivide).toHaveBeenCalledWith(a, b);
    });
  });
});