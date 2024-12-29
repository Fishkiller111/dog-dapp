import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { address } = body;

    // 添加调试日志
    console.log('Received address:', address);
    console.log('Environment variables:', {
      accountId: process.env.NUXT_R2_ACCOUNT_ID,
      bucketName: process.env.NUXT_R2_BUCKET_NAME,
    });

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

    return {
      success: true,
      objectKey,
    };
  } catch (error) {
    // 详细错误日志
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      })
    };
  }
});