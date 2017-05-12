import { hello } from './hello.handler';
import * as chai from 'chai';
import { describe, it } from 'mocha';
const expect = chai.expect;

describe('hello function', () => {
  it('processes the query string', done => {
    const requestEvent = {
      method: 'GET',
      query: {
          foo: 'bar'
      }
    };

    hello(requestEvent, {}, (err, result) => {
      expect(err).to.be.undefined;
      expect(result.event).to.equal(requestEvent);
      expect(result.message).to.equal('Method: GET, Param: bar');

      done();
    });
  });
});