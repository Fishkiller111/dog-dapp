import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

async function uploadToR2(address) {
  try {
    const s3 = new S3Client({
      region: 'auto', 
      endpoint: `https://${process.env.NUXT_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.NUXT_R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NUXT_R2_SECRET_ACCESS_KEY || '',
      },
    });

    const objectKey = `tao-addresses/${Date.now()}-${address}.txt`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.NUXT_R2_BUCKET_NAME,
        Key: objectKey,
        Body: address,
      })
    );

    console.log('上传成功:', objectKey);
    return { success: true, objectKey };
    
  } catch (error) {
    console.error('上传失败:', {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// 测试上传
const testAddress = '测试地址123';
uploadToR2(testAddress)
  .then(result => console.log('测试结果:', result))
  .catch(err => console.error('测试错误:', err));