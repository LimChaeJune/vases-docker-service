import path from 'path';
import { DataConnector } from './datasource';
import logger from './logger';
import { Logger } from 'winston';

export class ModuleManager {
  connector: DataConnector;
  logger: Logger;
  constructor() {}

  async initialize() {
    this.logger = logger;

    const connector = new DataConnector(config.database);

    await connector.connect();
    await connector.initialize();

    this.connector = connector;
  }
}

export default new ModuleManager();
