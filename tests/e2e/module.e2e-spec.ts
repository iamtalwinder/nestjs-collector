import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TransactionModule } from '../example/transaction.module';

describe('TransactionModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should process a valid transaction', async () => {
    // Assuming you have an endpoint to handle transaction processing
    await request(app.getHttpServer())
      .post('/process-transaction')
      .send({ id: 1, amount: 100, currency: 'USD' })
      .expect(200)
      .expect({ result: true });
  });

  it('should reject an invalid transaction', async () => {
    await request(app.getHttpServer())
      .post('/process-transaction')
      .send({ id: 2, amount: -100, currency: 'USD' })
      .expect(200)
      .expect({ result: false });
  });

  afterAll(async () => {
    await app.close();
  });
});
