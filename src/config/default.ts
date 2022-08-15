import dotenv from 'dotenv';

interface IConfig {
  port: string;
  secrets: {
    password: string;
    verifyCode: string;
  },
  database: {
    name: string;
    username: string;
    password: string;
  };
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    activationLink: string;
  };
  asw: {
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
  };
  nodemailer: {
    host: string;
    port: string;
    auth: {
      user: string;
      pass: string;
    };
  };
}

dotenv.config();

const defaultConfig: IConfig = {
  port: process.env.PORT,
  secrets: {
    password: process.env.SECRETS_PASSWORD,
    verifyCode: process.env.SECRETS_VERIFY_CODE,
  },
  database: {
    name: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    activationLink: process.env.JWT_ACTIVATION_LINK,

  },
  asw: {
    accessKeyId: process.env.ASW_ACCESS_KEY,
    secretAccessKey: process.env.ASW_SECRET_KEY,
    bucketName: process.env.ASW_BUCKET_NAME,
  },
  nodemailer: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
};
export default defaultConfig;
