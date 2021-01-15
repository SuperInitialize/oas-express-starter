import { COLLECTIONS, ROLES } from '../../../../../src/constants';
import { Note, User } from '../../../../../src/entities';
import { app, database, logger } from '../../../../../src/server';
import { describe, it } from 'mocha';
import { expect, request } from 'chai';
import { Model } from '../../../../../src/helpers';
import chaiHttp from 'chai-http';
import { config } from '../../../../../src/configs';
import { nanoid } from 'nanoid';
import { sign } from 'jsonwebtoken';
import { use } from 'chai';

use(chaiHttp);

export const userNotesById = (): void => {
  describe('GET', (): void => {
    it('should respond 200', async (): Promise<void> => {
      const userModel = new Model<User>(logger, database, COLLECTIONS.USERS);
      const testUser = new User(ROLES.USER, nanoid(12), nanoid(12), nanoid(12), nanoid(12));
      const [testUserId] = await userModel.save(testUser);
      const testAccessToken = sign({ id: testUserId }, config.LOGIN_SECRET, { expiresIn: config.LOGIN_TTL });
      const noteModel = new Model<Note>(logger, database, COLLECTIONS.NOTES);
      const testNote = new Note(testUserId, nanoid(12), nanoid(12));
      const [testNoteId] = await noteModel.save(testNote);

      const response = await request(app)
        .get(`/api/v1/user/notes/${testNoteId}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send();

      expect(response.status).to.be.equal(200);
    });

    it('should respond 404 WHEN not does not exist', async (): Promise<void> => {
      const userModel = new Model<User>(logger, database, COLLECTIONS.USERS);
      const testUser = new User(ROLES.USER, nanoid(12), nanoid(12), nanoid(12), nanoid(12));
      const [testUserId] = await userModel.save(testUser);
      const testAccessToken = sign({ id: testUserId }, config.LOGIN_SECRET, { expiresIn: config.LOGIN_TTL });
      const testNoteId = nanoid(12);

      const response = await request(app)
        .get(`/api/v1/user/notes/${testNoteId}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send();

      expect(response.status).to.be.equal(404);
    });
  });

  describe('PATCH', (): void => {
    it('should respond 204', async (): Promise<void> => {
      const userModel = new Model<User>(logger, database, COLLECTIONS.USERS);
      const testUser = new User(ROLES.USER, nanoid(12), nanoid(12), nanoid(12), nanoid(12));
      const [testUserId] = await userModel.save(testUser);
      const testAccessToken = sign({ id: testUserId }, config.LOGIN_SECRET, { expiresIn: config.LOGIN_TTL });
      const testNewBody = nanoid(12);
      const noteModel = new Model<Note>(logger, database, COLLECTIONS.NOTES);
      const testNote = new Note(testUserId, nanoid(12), nanoid(12));
      const [testNoteId] = await noteModel.save(testNote);

      const response = await request(app)
        .patch(`/api/v1/user/notes/${testNoteId}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ body: testNewBody });

      expect(response.status).to.be.equal(204);
    });

    it('should respond 404 WHEN not does not exist', async (): Promise<void> => {
      const userModel = new Model<User>(logger, database, COLLECTIONS.USERS);
      const testUser = new User(ROLES.USER, nanoid(12), nanoid(12), nanoid(12), nanoid(12));
      const [testUserId] = await userModel.save(testUser);
      const testAccessToken = sign({ id: testUserId }, config.LOGIN_SECRET, { expiresIn: config.LOGIN_TTL });
      const testNewBody = nanoid(12);
      const testNoteId = nanoid(12);

      const response = await request(app)
        .patch(`/api/v1/user/notes/${testNoteId}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ body: testNewBody });

      expect(response.status).to.be.equal(404);
    });
  });

  describe('DELETE', (): void => {
    it('should respond 204', async (): Promise<void> => {
      const userModel = new Model<User>(logger, database, COLLECTIONS.USERS);
      const testUser = new User(ROLES.USER, nanoid(12), nanoid(12), nanoid(12), nanoid(12));
      const [testUserId] = await userModel.save(testUser);
      const testAccessToken = sign({ id: testUserId }, config.LOGIN_SECRET, { expiresIn: config.LOGIN_TTL });
      const noteModel = new Model<Note>(logger, database, COLLECTIONS.NOTES);
      const testNote = new Note(testUserId, nanoid(12), nanoid(12));
      const [testNoteId] = await noteModel.save(testNote);

      const response = await request(app)
        .delete(`/api/v1/user/notes/${testNoteId}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send();

      expect(response.status).to.be.equal(204);
    });

    it('should respond 404 WHEN not does not exist', async (): Promise<void> => {
      const userModel = new Model<User>(logger, database, COLLECTIONS.USERS);
      const testUser = new User(ROLES.USER, nanoid(12), nanoid(12), nanoid(12), nanoid(12));
      const [testUserId] = await userModel.save(testUser);
      const testAccessToken = sign({ id: testUserId }, config.LOGIN_SECRET, { expiresIn: config.LOGIN_TTL });
      const testNoteId = nanoid(12);

      const response = await request(app)
        .delete(`/api/v1/user/notes/${testNoteId}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send();

      expect(response.status).to.be.equal(404);
    });
  });
};
