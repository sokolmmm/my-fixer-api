import AWS from 'aws-sdk';
import defaultConfig from '../../config/default';

const options = {
  accessKeyId: defaultConfig.asw.accessKeyId,
  secretAccessKey: defaultConfig.asw.secretAccessKey,
};

AWS.config.update(options);

export default AWS;
