import { NextRequest, NextResponse } from "next/server";
import AWS from 'aws-sdk';
import { Readable } from 'stream';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.BUCKET_NAME;

export async function GET() {
  if (!bucketName) {
    throw new Error('BUCKET_NAME is not defined in the environment variables');
  }

  const params = {
    Bucket: bucketName,
  };
  
  try {
    const res = await s3.listObjectsV2(params).promise();
    console.log('res ' + res)
    return NextResponse.json(res); // Return the AWS response directly
  } catch (error) {
    console.error('Error fetching S3 objects:', error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  if (!bucketName) {
    return NextResponse.json({ error: 'Bucket name is not defined' }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const category = formData.get('category') as string;

  if (!file || !category) {
    return NextResponse.json({ error: 'File and category are required' }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const fileStream = Readable.from(Buffer.from(fileBuffer));

  const params = {
    Bucket: bucketName,
    Key: `${category}/${file.name}`,
    Body: fileStream,
    ContentType: file.type,
  };

  try {
    await s3.upload(params).promise();
    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}

export async function getFirstLevelFolders(request: NextRequest) {
  if (!bucketName) {
    return NextResponse.json({ error: 'Bucket name is not defined' }, { status: 500 });
  }

  try {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: bucketName,
      Delimiter: '/'
    };

    const data = await s3.listObjectsV2(params).promise();
    const firstLevelFolders = data.CommonPrefixes?.map(prefix => prefix.Prefix?.slice(0, -1)) || [];

    return NextResponse.json({ folders: firstLevelFolders });
  } catch (error) {
    console.error('Error fetching first level folders:', error);
    return NextResponse.json({ error: 'Error fetching first level folders' }, { status: 500 });
  }
}