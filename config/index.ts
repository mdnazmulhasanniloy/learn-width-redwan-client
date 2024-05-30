export const serverUrl =
  `http://localhost:2000/api/v1/` || process.env.NEXT_PUBLIC_BASE_URL;
//
export const db_url = process.env.DB_URL;

export const authSecret = process.env.AUTH_SECRET;

export const googleClientId = process.env.AUTH_GOOGLE_ID;
export const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;

export const githubClientId = process.env.AUTH_GITHUB_ID;
export const githubClientSecret = process.env.AUTH_GITHUB_SECRET;

export const awsRegion = process.env.NEXT_PUBLIC_AWS_REGION;
export const awsBucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
export const awsAccessKey = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
export const awsSecretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};
