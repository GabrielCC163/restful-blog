import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Perform authentication to get the token
    // This is a simplified example and you might need to adjust it based on your authentication setup
    const authResponse = await request(app.getHttpServer()).post('/auth/signin').send({
      username: 'reeves@gmail.com',
      password: '123123',
    });

    token = authResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should create a Post', async () => {
    const title = 'How To Create a CRUD App';
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'How To Create a CRUD App',
        imageUrl: 'https://media.istockphoto.com/id/abc',
        content: 'First, start by installing...',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    expect(response.body.title).toEqual(title);
  });
});
