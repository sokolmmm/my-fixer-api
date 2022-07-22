import dotenv from 'dotenv';

interface IConfig {
  port: string;
  secret: string,
  jwt: {
    accessSecret: string,
    refreshSecret: string,
  },
  database: {
    name: string;
    username: string;
    password: string;
  };
  asw: {
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
  };
}

dotenv.config();

const defaultConfig: IConfig = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  database: {
    name: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  asw: {
    accessKeyId: process.env.ASW_ACCESS_KEY,
    secretAccessKey: process.env.ASW_SECRET_KEY,
    bucketName: process.env.ASW_BUCKET_NAME,
  },
};

export default defaultConfig;
