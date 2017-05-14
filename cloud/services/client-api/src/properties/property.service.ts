import { Promise } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Property } from './models/property.model';
import { createConnection } from "../shared/connection.service";

export class PropertyService {
  connection: Sequelize;

  constructor(private property: typeof Property) {
    this.connection = createConnection([property]);
  }

  //todo: swallow internal errors and re-throw user friendly ones
  create(body: any): Promise<Property> {
    return this.property.create(body);
  }

  read(id: number): Promise<Property> {
    return this.property.findOne({ where: { id: id }});
  }

  update(id: number, body: any): Promise<Property> {
    return this.property.update(body, { where: { id: id }});
  }

  destroy(id: number): Promise<Property> {
    return this.property.destroy({ where: { id: id }});
  }
}