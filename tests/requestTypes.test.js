const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const { connectDB, disconnectDB } = require('../src/config/database');
const RequestType = require('../src/models/RequestType');

beforeAll(async () => {
  await connectDB();
  await RequestType.deleteMany({});
});

afterAll(async () => {
  await disconnectDB();
  await mongoose.connection.close();
});

describe('API RequestTypes', () => {
  test('GET /health : retourne status 200', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /api/request-types : retourne un tableau', async () => {
    const res = await request(app).get('/api/request-types');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/request-types : crée avec succès', async () => {
    const payload = {
      code: 'TEST_REQUEST',
      name: 'Test request type',
      description: 'Type de demande pour les tests',
      priority: 'medium',
      category: 'test',
      estimatedResponseTime: 24,
      isActive: true,
    };

    const res = await request(app).post('/api/request-types').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      code: payload.code,
      name: payload.name,
      description: payload.description,
      priority: payload.priority,
      category: payload.category,
      estimatedResponseTime: payload.estimatedResponseTime,
      isActive: payload.isActive,
    });
  });

  test('GET /api/request-types/:id : retourne un type existant', async () => {
    const created = await RequestType.create({
      code: 'GET_BY_ID',
      name: 'Get by id',
      description: 'Test get by id',
      priority: 'low',
      category: 'test',
      estimatedResponseTime: 12,
      isActive: true,
    });

    const res = await request(app).get(`/api/request-types/${created._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      _id: created._id.toString(),
      code: 'GET_BY_ID',
    });
  });

  test('GET /api/request-types/:id : retourne 404 pour un id inexistant', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).get(`/api/request-types/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'RequestType not found' });
  });

  test('GET /api/request-types/:id : retourne 400 pour un id invalide', async () => {
    const res = await request(app).get('/api/request-types/not-a-valid-id');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Invalid id' });
  });

  test('POST /api/request-types : retourne 400 si payload invalide', async () => {
    const res = await request(app).post('/api/request-types').send({}); // rien du tout

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Invalid payload' });
  });
});
