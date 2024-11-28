import AWS from 'aws-sdk';
const config = useRuntimeConfig()

const S3 = new AWS.S3({
  endpoint: 'https://storage.yandexcloud.net', // Адрес Yandex Cloud Object Storage
  accessKeyId: config.ycAccessKeyId,               // Ваш Access Key ID
  secretAccessKey: config.ycSecretAccessKKey,       // Ваш Secret Access Key
  region: 'ru-central1',
  httpOptions: {
    timeout: 10000,
    connectTimeout: 10000
  },
});

export default S3;