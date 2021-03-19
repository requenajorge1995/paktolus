import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { expiredToken } from './test-data';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/google without authorization', () => {
    return request(app.getHttpServer()).get('/auth/google').expect(401);
  });

  it('/auth/google with expired token', () => {
    return request(app.getHttpServer())
      .get('/auth/google')
      .auth(expiredToken, { type: 'bearer' })
      .expect(401);
  });
});
