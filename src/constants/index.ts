import config from '../config.json';

export const SERVER_PORT = process.env.PORT || config.PORT || 8080;
export const UPLOADS_DIR_NAME = 'uploads';
