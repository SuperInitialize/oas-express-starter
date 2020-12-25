import { ENVIRONMENTS } from '../../src/constants';

process.env.NODE_ENV = ENVIRONMENTS.INTEGRATION;

process.env.CONFIG_DB_URI = 'mongodb://mongodb:27017';
process.env.CONFIG_DB_NAME = `oasDB-integration-${Date.now()}`;
