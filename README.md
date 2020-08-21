# Secret Sharing Web Client

INCOMPLETE PROTOTYPE

Secure secret sharing with expiring links

Encrypts a message with a passphrase and stores a hash of the passphrase and the encrypted cipher and generates a unique URL to retrieve them.

The passphrase is required to retrieve the secret. Links expire and the  encrypted cipher and hash are deleted after a maximum of 3 days. The unencrypted data or passphrase are never stored.

It is recommended that the link and passphrase are communicated to the recipient using separate channels, e-mail, signal, sms etc.


## Dependencies

Serverless backend https://github.com/slartibastfast/secret-sharer-server.git

### Installation

git clone https://github.com/slartibastfast/secret-sharer-client.git

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

