/* eslint-env mocha */

// mocha imports
import chai from 'chai';
import chaiMatchPattern from 'chai-match-pattern';
chai.use(chaiMatchPattern);
const expect = chai.expect;

// lib imports
import { WrappedApi } from './WrappedApi.js';

const api = new WrappedApi().init({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

describe('WrappedApi', function () {
  describe('get', function () {
    it('retrieves a record', async function () {
      const response = await api.get('/posts/1');

      expect(response).to.matchPattern({
        status: 200,
        statusText: 'OK',
        data: {
          userId: 1,
          id: 1,
          title:
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          body:
            'quia et suscipit\n' +
            'suscipit recusandae consequuntur expedita et cum\n' +
            'reprehenderit molestiae ut ut quas totam\n' +
            'nostrum rerum est autem sunt rem eveniet architecto',
        },
      });
    });
  });

  describe('post', function () {
    it('creates a record', async function () {
      const response = await api.post(
        '/posts',
        {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      expect(response).to.matchPattern({
        status: 201,
        statusText: 'Created',
        data: { title: 'foo', body: 'bar', userId: 1, id: 101 },
      });
    });
  });

  describe('put', function () {
    it('updates a record', async function () {
      const response = await api.put(
        '/posts/1',
        {
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      expect(response).to.matchPattern({
        status: 200,
        statusText: 'OK',
        data: { id: 1, title: 'foo', body: 'bar', userId: 1 },
      });
    });
  });

  describe('patch', function () {
    it('patches a record', async function () {
      const response = await api.put(
        '/posts/1',
        {
          title: 'foo',
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      expect(response).to.matchPattern({
        status: 200,
        statusText: 'OK',
        data: { title: 'foo', id: 1 },
      });
    });
  });

  describe('delete', function () {
    it('deletes a record', async function () {
      const response = await api.delete('/posts/1');

      expect(response).to.matchPattern({
        status: 200,
        statusText: 'OK',
        data: {},
      });
    });
  });
});
