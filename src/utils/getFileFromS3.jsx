import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

export const getFileFromS3 = async (fileName, email, setViewFile, setMimeType) => {
    const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
    const REGION = process.env.REACT_APP_BUCKET_REGION;
    const ACCESS_KEY_ID = process.env.REACT_APP_BUCKET_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_BUCKET_SECRET_ACCESS_KEY;

    const s3Client = new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
        },
    });

    const params = {
        Bucket: S3_BUCKET,
        Key: `${email}?${fileName}`,
    };

    try {
        const command = new GetObjectCommand(params);
        const response = await s3Client.send(command);

        const contentType = response.ContentType || 'application/octet-stream';
        setMimeType(contentType);

        const fileStream = response.Body;
        const chunks = [];

        for await (let chunk of fileStream) {
            chunks.push(chunk);
        }

        const fileContent = Buffer.concat(chunks);
        const blob = new Blob([fileContent], { type: contentType });

        console.log("File data ====> ", blob, "File type ===> ", blob.type);

        // Create URL for the blob
        const url = URL.createObjectURL(blob);
        console.log(url);
        setViewFile(url);
    } catch (err) {
        console.log("Error getting file from S3: ", err);
        setMimeType('');
        setViewFile(null);
    }
}