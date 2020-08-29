[![Netlify Status](https://api.netlify.com/api/v1/badges/aaf671da-069e-4dc8-bc29-8b1650e7fbee/deploy-status)](https://app.netlify.com/sites/secret-sharer/deploys)

# Secret Sharing Web Client

INCOMPLETE PROTOTYPE

Secure secret sharing with expiring links

Encrypts a message with a passphrase and stores a hash of the passphrase and the encrypted cipher and generates a unique URL to retrieve them.

The passphrase is required to retrieve the secret. Links expire and the  encrypted cipher and hash are deleted after a maximum of 3 days. The unencrypted data or passphrase are never stored.

It is recommended that the link and passphrase are communicated to the recipient using separate channels, e-mail, signal, sms etc.


## Minimum Viable  Product Requirements
    -   Creating  secrets   
        -   Request a secret (text,  <=100KB), expiry (1-72hrs) and passphrase (>=10 characters) from a user
        -   Add a hidden form field, honeypot, if populated do not submit
        -   Capture time to populate and submit form and submit with request
        -   Generate a cryptographically random passphrase if user does not supply one
        -   Generate and store an SHA-256 cryptographic hash of user provided passphrase
        -   Generate and store an AES-256 cipher of user provided text up to 100KB
        -   Store the cipher, expiry and hash in a dynamoDB table and generate a unique URL that can be  used to retrieve the cipher
        -   Return a unique application URL patch that can be used to retrieve the cipher
        -   Delete the cipher and hash
        -   Delete access logs incluing requester IP
    -   Retrieving secrets
        -   Request passphrase, hash and send to request API
        -   If hash matches return cipher to requester and
                -   delete the item in DynamoDB
                -   delete all access logs including requester IP
        -   If link is not valid return a message saying link is not valid or secret has expired
        -   If hash does not match
            -   Increment failedAttempt counter by 1
            -   If failedAttempt counter is >=3 rate limit requests to 1 per hour
        -   If rate limit is in place send message to requester
    - Backend features
    -   Delete expired items in DynamoDB every 30 days
    -   A copy button should allow link and passphrase to be copied to clipboard

### Additional Features

-   Functional
    -   Implement Web Share API for link, passphrase or hint (require separate channels)
    -   Package as a personal web app so it appears in sharing menu (Google Android only, https://web.dev/customize-install/#criteria)
    -   Add a passphrase hint feature (means passphrase may not need to be sent if the sender and receiver share some knowlege, e.g. 'that cafe where we had the nice fish')
    -   Add file uploads, limit to 1MB to reduce costs
   
-   Security and Compliance
    -   Rate limit / require captcha for more than 100 requests per day from unique IPs
    -   Block requests from known malicious networks
    -   Add a blog article that explains the security, risk and compliance posture
    -   Add a blog article that explains the risks and how to share secrets securely

## Dependencies

Serverless backend https://github.com/slartibastfast/secret-sharer-server.git

### Installation

git clone https://github.com/slartibastfast/secret-sharer-client.git

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Continuous Deployment

Commits to the master branch are deployed to https://secret-sharer.netlify.app/, refer to netlify.toml


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

