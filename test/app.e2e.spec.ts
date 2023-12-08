/* eslint-disable sonarjs/no-duplicate-string */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userId: string;
  let imageUrl: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    imageUrl = 'https://media.istockphoto.com/id/abc';
    const authResponse = await request(app.getHttpServer()).post('/auth/signin').send({
      email: 'reeves@gmail.com',
      password: '123123',
    });
    token = authResponse.body.token;
    userId = authResponse.body.data.sub;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should create, update and show a Post', async () => {
    const title = 'How To Create a CRUD App';
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: `${title} ${new Date().toISOString()}`,
        content: 'First, start by installing...',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    expect(response.body.title).toContain(title);
    const postId = response.body.id;

    const updateResponse = await request(app.getHttpServer())
      .put(`/posts/${postId}`)
      .send({ imageUrl })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(updateResponse.body.imageUrl).toEqual(imageUrl);

    const showResponse = await request(app.getHttpServer())
      .get(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(showResponse.body.id).toEqual(postId);
    expect(showResponse.body.user).toBeDefined();
    expect(showResponse.body.user.email).toEqual('reeves@gmail.com');
  });

  it('should remove a Post', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: `Post to be deleted ${new Date().toISOString()}`,
        content: 'Here is how to create a post...',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const postId = response.body.id;
    await request(app.getHttpServer()).del(`/posts/${postId}`).set('Authorization', `Bearer ${token}`).expect(204);
    await request(app.getHttpServer()).get(`/posts/${postId}`).set('Authorization', `Bearer ${token}`).expect(404);
  });

  it('should not be able to create a Post without title/content', async () => {
    const responseWithoutTitle = await request(app.getHttpServer())
      .post('/posts')
      .send({
        content: 'First, start by installing...',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(responseWithoutTitle.body.message).toContain('title should not be empty');

    const responseWithoutContent = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'How to understand the Event Loop',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(responseWithoutContent.body.message).toContain('content should not be empty');
  });

  it('user should not be able to update a post that was not created by him', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: `How to invest in ETF ${new Date().toISOString()}`,
        content: 'First, start by opening an account in a...',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    const postId = response.body.id;

    const user2AuthResponse = await request(app.getHttpServer()).post('/auth/signin').send({
      email: 'jackman@gmail.com',
      password: '123123',
    });
    const tokenFromUser2 = user2AuthResponse.body.token;

    await request(app.getHttpServer())
      .put(`/posts/${postId}`)
      .send({ imageUrl })
      .set('Authorization', `Bearer ${tokenFromUser2}`)
      .expect(404);
  });

  it('should be able to create comments in a post and list them', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: `How to learn Taekwondo ${new Date().toISOString()}`,
        content: 'First, start by enrolling in a...',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const postId = response.body.id;
    const commentContent = 'Nice one!';
    const commentResponse = await request(app.getHttpServer())
      .post(`/posts/${postId}/comments`)
      .send({
        content: commentContent,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    expect(commentResponse.body.id).toBeDefined();
    expect(commentResponse.body.postId).toEqual(postId);
    expect(commentResponse.body.content).toEqual(commentContent);
    expect(commentResponse.body.createdAt).toBeDefined();
    expect(commentResponse.body.updatedAt).toBeDefined();
    expect(commentResponse.body.createdBy).toBeDefined();

    await request(app.getHttpServer())
      .post(`/posts/${postId}/comments`)
      .send({
        content: 'Hello there, hire me :)',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const queryResponse = await request(app.getHttpServer())
      .get(`/posts/${postId}/comments`)
      .query({ search: 'hire' })
      .expect(200);

    expect(queryResponse.body.items).toHaveLength(1);
    expect(queryResponse.body.items[0].user.email).toEqual('reeves@gmail.com');

    const paginatedResponse = await request(app.getHttpServer())
      .get(`/posts/${postId}/comments`)
      .query({ page: 1, limit: 1 })
      .expect(200);

    expect(paginatedResponse.body.items).toHaveLength(1);
    expect(paginatedResponse.body.meta.totalItems).toEqual(2);
    expect(paginatedResponse.body.meta.itemCount).toEqual(1);
    expect(paginatedResponse.body.links).toBeDefined();

    const commentsFromUserResponse = await request(app.getHttpServer())
      .get(`/posts/${postId}/comments`)
      .query({ userId })
      .expect(200);

    expect(commentsFromUserResponse.body.items).toHaveLength(2);
    expect(commentsFromUserResponse.body.meta.totalItems).toEqual(2);
  });
});
