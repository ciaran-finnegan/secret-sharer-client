# Encrypted expiring messages allows you to securely exchange confidential data with your customers and coworkers.

Perfect for sharing one time passwords, API keys, license keys, VPN credentials or personally identifiable information such as credit cards, bank account numbers and identity information.

## Confidential data exchanged via e-mail is difficult to delete and may introduce a compliance risk.

### How it works

Encryption and decryption of the secret always happens in the browser using an encryption key generated from a passphrase you provide.

Our service stores a hash of the passphrase and the encrypted cipher which can be retrieved only once using the unique link provided.

The hash and cipher are purged from our service on retrieval or expiry of the link.

### Technology we use

We use the CryptoJS implementations of standard and secure cryptographic algorithms

#### Hashing

We use the SHA-256 hashing which is one of the four variants in the SHA-2 set. It isn&#39;t as widely used as SHA-1, though it appears to provide much better security.

#### Encryption

We use the Advanced Encryption Standard (AES-256), a U.S. Federal Information Processing Standard (FIPS). It was selected after a 5-year process where 15 competing designs were evaluated. We will generate a 256-bit key from the passphrase provided.

#### Cloud Service

Our service is hosted on Amazon Web Services using serverless lambda functions and DynamoDB.

SHHH.link
Copyright © 2019-2020 [Terms Of Service](https://shhh.link/terms) &amp; [Privacy Policy](https://shhh.link/privacy).