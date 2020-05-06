import packageJson from '../../package.json';

export const SERVER_URL = 'http://localhost:8080';
export const CLIENT_VERSION = packageJson.version;
export const REACT_VERSION = packageJson.dependencies.react;
export const APP_NAME = packageJson.app.name;
