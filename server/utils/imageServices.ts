import {
  S3Client,
  ListBucketsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IBook } from "../types/types";
import { redisClient } from "../database/cache";
// Rest of your code here

// async function uploadImage(base64String: string, key: string) {
//   const imageBuffer = Buffer.from(base64String.split(",")[1], "base64");
//   console.log(
//     process.env.S3_BUCKET,
//     process.env.S3_ACCESSKEYID,
//     process.env.S3_SECRETACCESSKEY,
//     process.env.S3_REGION
//   );
//   const command = new PutObjectCommand({
//     Bucket: process.env.S3_BUCKET,
//     Key: "public/" + key,
//     Body: imageBuffer, // Set the image buffer as the object's data
//     ContentType: "image/png",
//   });
//   try {
//     const url = await s3Client.send(command);
//   } catch (err: any) {
//     console.log(err.message);
//   }
// }

// const changeImageURL = async (book: IBook) => {
//   const key = book._id + ".png";
//   const imageURL = await uploadImage(book.imageURL, key);
//   return key;
// };

// export const updateBooks = async (req: Request, res: Response) => {
//   try {
//     const book = await bookModel.findOne({ _id: "646ba43dab0e001144d43c47" });
//     if (book) {
//       book.imageURL = await changeImageURL(book);
//       // book.imageURL =
//       //   "asfddfs";
//       await book.save();
//       res.send("hello");
//     }
//   } catch (error: any) {
//     console.log(error.message);
//     res.send("sorry");
//   } //
// };
const s3Client = new S3Client({
  region: process.env.S3_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESSKEYID || "",
    secretAccessKey: process.env.S3_SECRETACCESSKEY || "",
  },
});
async function getObjectURL(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET || "",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}

const checkImageCache = async (imageURL: string) => {
  try {
    const appendtoURL = "public/";
    const cachedPresignedUrl = await redisClient.get(appendtoURL + imageURL);
    if (cachedPresignedUrl) {
      return cachedPresignedUrl;
    } else {
      const presignedUrl = await getObjectURL(appendtoURL + imageURL);
      await redisClient.setEx(appendtoURL + imageURL, 3600, presignedUrl);
      return presignedUrl;
    }
  } catch (err: any) {
    return "";
  }
};

export const renderBookImage = async (data: IBook[]) => {
  const updateBooks = await Promise.all(
    data.map(async (book: IBook) => {
      const imageURL = await checkImageCache(book.imageURL);
      book.imageURL = imageURL;
      return book;
    })
  );
  return updateBooks;
};
