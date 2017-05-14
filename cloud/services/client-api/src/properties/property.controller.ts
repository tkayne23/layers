import { Promise } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Property } from './models/property.model';
import { createConnection } from "../shared/connection.service";

export class PropertyController {
  connection: Sequelize;

  constructor(private model: typeof Property) {
    this.connection = createConnection([model]);
  }

  create(body: any, user: string): Promise<Property> {
    let property = new this.model(body);
    property.ownerId = user;

    return property
      .save()
      .then(property => property.toJSON());
  }

  read(id: number, user: string): Promise<Property> {
    return this.model.findOne({ where: { id: id, ownerId: user }});
  }

  update(id: number, body: any, user: string): Promise<Property> {
    return this.model.findOne({ where: { id: id, ownerId: user }})
      .then(property => {
        property.set(body);
        // do some processing here

        return property.save();
      })
      .then(property => property.toJSON());
  }

  destroy(id: number, user: string): Promise<Property> {
    return this.model.findOne({ where: { id: id, ownerId: user }})
      .then(property => {
        // do some cleanup here

        property.destroy();
      });
  }
}