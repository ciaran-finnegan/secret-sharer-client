
  const dev = {
    STRIPE_KEY: "YOUR_STRIPE_DEV_PUBLIC_KEY",
    s3: {
      REGION: "ap-southeast-2",
      BUCKET: "secret-sharer-uploads"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://w331frxwn6.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "ap-southeast-2",
      USER_POOL_ID: "ap-southeast-2_YLCDSpHtp",
      APP_CLIENT_ID: "460kgnhisptldafqef7mhaopn1",
      IDENTITY_POOL_ID: "ap-southeast-2:14e736c3-8cbe-43cd-91c7-fa1185f31638"
    }
  };
  
  const prod = {
    STRIPE_KEY: "YOUR_STRIPE_PROD_PUBLIC_KEY",
    s3: {
      REGION: "YOUR_PROD_S3_UPLOADS_BUCKET_REGION",
      BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
    },
    apiGateway: {
      REGION: "YOUR_PROD_API_GATEWAY_REGION",
      URL: "YOUR_PROD_API_GATEWAY_URL"
    },
    cognito: {
      REGION: "YOUR_PROD_COGNITO_REGION",
      USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
      APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
      IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
    }
  };
  
  // Default to dev if not set
  const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    DEFAULT_EXPIRY: 72,
    ...config
  };
