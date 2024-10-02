import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const bucketName = process.env.BUCKET_NAME;

function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}


export async function POST(req: NextRequest) {
  console.log('Iniciando carga de video');
  
  if (!bucketName) {
    console.error('BUCKET_NAME no está definido en las variables de entorno');
    return setCorsHeaders(NextResponse.json({ success: false, message: "Error de configuración del servidor" }, { status: 500 }));
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;
    let customName = formData.get('customName') as string;
    
    if (!file || !folder) {
      return setCorsHeaders(NextResponse.json({ success: false, message: "No se proporcionó archivo o carpeta" }, { status: 400 }));
    }

    const buffer = await file.arrayBuffer();

    // Obtener la lista de objetos en la carpeta
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: folder + '/'
    });
    const listResult = await s3Client.send(listCommand);

    // Determinar el próximo número de secuencia
    let nextSequence = 1;
    if (listResult.Contents && listResult.Contents.length > 0) {
      const sortedContents = listResult.Contents.sort((a, b) => {
        const aNum = parseInt(a.Key!.split('/').pop()!.split('.')[0]);
        const bNum = parseInt(b.Key!.split('/').pop()!.split('.')[0]);
        return aNum - bNum;
      });
      const lastFile = sortedContents[sortedContents.length - 1].Key;
      const lastSequence = parseInt(lastFile!.split('/').pop()!.split('.')[0]);
      nextSequence = lastSequence + 1;
    }

    console.log(`Carpeta seleccionada: ${folder}, Próximo número de secuencia: ${nextSequence}`);
    
    // Formatear el nombre del archivo
    const fileNameParts = customName.split('.');
    const extension = fileNameParts.pop()?.toLowerCase();
    const nameWithoutExtension = fileNameParts.join('.').toUpperCase();
    customName = `${nextSequence}.${nameWithoutExtension}.${extension}`;
    const key = `${folder}/${customName}`;

    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    });

    console.log('Iniciando carga a S3');
    const result = await s3Client.send(putCommand);
    console.log('Carga a S3 completada', result);

    return setCorsHeaders(NextResponse.json({
      success: true,
      message: "Video subido exitosamente",
      data: { key: key, url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}` },
    }));
  } catch (error) {
    console.error('Error al subir el video:', error);
    return setCorsHeaders(NextResponse.json({ success: false, message: "Error al subir el video" }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}