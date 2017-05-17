import { Promise } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Property } from './models/property.model';
import { uuid } from 'uuid/v4';

export class PropertyController {
  constructor(private db: Sequelize, private collection: typeof Property) {}

  create(body: any, userId: string): Promise<Property> {
    let property = this.collection.build<Property>({
      id: uuid(),
      ...body
    });

    // property.sections = getSectionsFromLegal(property.legalDescription);


    property.ownerId = userId;

    return property
      .save()
      .then(property => property.toJSON());
  }

  readAll(userId: string): Promise<Property[]> {
    return this.collection.findAll<Property>({ where: { ownerId: userId }});
  }

  read(id: number, userId: string): Promise<Property> {
    return this.collection
      .findOne<Property>({ where: { id: id, ownerId: userId }})
      .catch(err => { throw new Error(`No Property found for id ${id}`); });
  }

  update(id: number, body: any, userId: string): Promise<Property> {
    return this.collection.findOne<Property>({ where: { id: id, ownerId: userId }})
      .then(property => {
        property.set(body);
        // do some processing here
        // if (property.lastAppraisal - Date.now() > 7 days) { // use moment.js or something for this
        //  property.NPV = property.sections.reduce(section => section.NPV);
        // }

        return property.save();
      })
      .then(property => property.toJSON());
  }

  destroy(id: number, userId: string): Promise<void> {
    return this.collection.findOne<Property>({ where: { id: id, ownerId: userId }})
      .then(property => {
        // do some cleanup here

        return property.destroy();
      });
  }
}