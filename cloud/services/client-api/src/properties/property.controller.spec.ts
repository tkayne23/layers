import { Property } from './models/property.model';
import { SequelizeMock } from 'sequelize-mock';
import { PropertyController } from './property.controller';
import * as chai from 'chai';
import { describe, it, beforeEach } from 'mocha';
const expect = chai.expect;

let userId = '12345678-1234-1234-1234-123456790ab';

let defaultProperty = {
  name: 'My Awesome Mineralz'
  // TODO: ... more goes here
};

describe('property controller', () => {
  let db: any;
  let controller: PropertyController;

  beforeEach(() => {
    db = new SequelizeMock();

    let MockProperty = db.define('property', defaultProperty) as typeof Property;

    controller = new PropertyController(db, MockProperty);
  });

  it('exists', done => {
    expect(controller).to.exist;
    done();
  });

  describe ('creates a new property', () => {
    let promise = controller.create({
      name: 'My Super Cool Rocks'
    }, userId);

    it('should exist', done => {
      promise
      .then(property => {
        expect(property).to.exist;
      })
      .then(done, done);
    });
  });
});