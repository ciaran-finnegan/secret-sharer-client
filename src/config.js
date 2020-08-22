
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
