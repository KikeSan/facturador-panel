

const API_URL = {
  TIENDAS: `${process.env.API_HOST}/mth-factory/salesCheck/tiendas?limit=65`,
  LOGIN: `${process.env.API_HOST}/mth-factory/salesCheck/user/login`,
  UPDATE_PASSWORD: `${process.env.API_HOST}/mth-factory/salesCheck/user/updatePassword`,
  CREATE_USER: `${process.env.API_HOST}/mth-factory/salesCheck/user/addUser`
}

const Config = {
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PATH: process.env.SERVER_PATH,
  API_URL: API_URL
};

export default Config;
