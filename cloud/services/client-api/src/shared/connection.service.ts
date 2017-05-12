// If we use TypeORM, this would let us pass the relevant Models without declaring them in the config.

interface Entity {};
let typeorm: any;

function createConnection(models: Entity[], options) {
  typeorm.createConnection().then(connection => {
    connection.addEntities(models);
    return connection;
  })
}

function createRepo(model: Entity, options) {
  typeorm.createConnection().then(connection => {
    connection.addEntities(model);
    return connection.getRepository(model);
  })
}