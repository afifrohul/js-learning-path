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

  describe('when GET /rectangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is result of perimeter rectangle correctly', async () => {
      // Arrange
      const a = 10;
      const b = 5;
      const spyMultiply = vi.spyOn(MathBasic, 'multiply');
      const spyAdd = vi.spyOn(MathBasic, 'add');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/rectangle/perimeter/${a}/${b}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(30);
      expect(spyMultiply).toHaveBeenCalledWith(2, 15);
      expect(spyAdd).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /rectangle/area', () => {
    it('should respond with a status code of 200 and the payload value is result of area rectangle correctly', async () => {
      // Arrange
      const a = 10;
      const b = 5;
      const spyMultiply = vi.spyOn(MathBasic, 'multiply');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/rectangle/area/${a}/${b}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(50);
      expect(spyMultiply).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /triangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is result of perimeter triangle correctly', async () => {
      // Arrange
      const a = 10;
      const b = 5;
      const c = 4;
      const spyAdd1 = vi.spyOn(MathBasic, 'add');
      const spyAdd2 = vi.spyOn(MathBasic, 'add');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/triangle/perimeter/${a}/${b}/${c}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(19);
      expect(spyAdd1).toHaveBeenCalledWith(a, b);
      expect(spyAdd2).toHaveBeenCalledWith(15, c);
    });
  });

  describe('when GET /triangle/area', () => {
    it('should respond with a status code of 200 and the payload value is result of area triangle correctly', async () => {
      // Arrange
      const a = 10;
      const b = 5;
      const spyDivide = vi.spyOn(MathBasic, 'divide');
      const spyMultiply = vi.spyOn(MathBasic, 'multiply');
      const app = createServer({ mathBasic: MathBasic });
      // Action
      const response = await request(app).get(`/triangle/area/${a}/${b}`);
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.value).toEqual(25);
      expect(spyMultiply).toHaveBeenCalledWith(a, b);
      expect(spyDivide).toHaveBeenCalledWith(50, 2);
    });
  });

});