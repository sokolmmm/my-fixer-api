// import { fileTypeFromBuffer } from 'file-type';
import { AWSError } from 'aws-sdk';

import AWS from '../libs/aws';
import defaultConfig from '../../config/default';
import Base64 from '../helpers/base64';

class AWSS3 {
  s3: any;

  constructor() {
    this.s3 = new AWS.S3();
  }

  async uploadS3(base64: string, folder: string, subfolder: string) {
    const base64Data = Base64.getData(base64);
    const ext = Base64.getExtension(base64);

    const timestamp = +new Date();
    const filename = `${folder}/${subfolder ? `${subfolder}/` : ''}${timestamp}.${ext}`;

    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: defaultConfig.asw.bucketName,
          Key: filename,
          Prefix: `${folder}/${subfolder}`,
          Body: base64Data,
          ContentEncoding: 'base64',
          ContentType: `image/${ext}`,
          ACL: 'public-read',
        },
        (err: AWSError, data: { Location: string }) => {
          if (err) {
            return reject(err);
          }
          return resolve(data.Location);
        },
      );
    });
  }
}

export default new AWSS3();
