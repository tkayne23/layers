import { Sequelize, Model } from 'sequelize-typescript';
import config from '../config';

export function createConnection(models: Array<typeof Model>, options?: object) {
  const sequelize = new Sequelize({
    ...config.db,
    ...options
  });

  sequelize.addModels(models);

  return sequelize;
}