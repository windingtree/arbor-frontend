# Public Keys Management on the Arbor

## Creation of keys

Currently, the Arbor supports keys of following types: secp256k1 and ETH (ECDSA)

### Creation of `secp256k1` keypair using `openssl` cli

```bash
openssl ecparam -name secp256k1 -genkey -noout -out secp256k1.pem
openssl ec -in secp256k1.pem -pubout -out secp256k1.pub
```

### Creation of ECDSA keypair using openssl

```
openssl ecparam -name secp256k1 -genkey -out key.pem
openssl ec -in key.pem -text -noout | grep priv -A 3 | tail -n +2 | tr -d '\n[:space:]:' | awk '{print $1""}' > ethereum.pem
openssl ec -in key.pem -text -noout | grep pub -A 5 | tail -n +2 | tr -d '\n[:space:]:' | sed 's/^04//' | awk '{print $1""}' | sha256sum | tr -d ' -' | tail -c 41 | awk '{print "0x" $0}' > ethereum.pub
```

### Creation of ECDSA keypair using Metamask

- Create new account in Metamask browser extension. Ethereum address of your the created account it is your public key
- To export a private key of the account use `Details` menu option in the account settings section

## Addition of the public key to the ORG.JSON

- Open an organization profile and follow to the `Agents` section
- Click on `Add agent key` link and fill the adding form
  - Choose the public key type (required option)
  - Enter the content part (without line breaks) of the public key to the `Key` field

Here how your public key can look like:  
```
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEmMd7WQHvvtyuso0uAE9GnJyvH6vWv6Xj
+FgAz5ZLMsw3HNRKRJtuY3E3jwn6EX9M+X3To2Ey/guBsb8kaQVUKg==
-----END PUBLIC KEY-----
```

Here the `content part` of your key:

```
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEmMd7WQHvvtyuso0uAE9GnJyvH6vWv6Xj+FgAz5ZLMsw3HNRKRJtuY3E3jwn6EX9M+X3To2Ey/guBsb8kaQVUKg==
```

  - Enter a `fragment` of your public key. Fragment it is a unique tag by which public key can be identified among other your keys. The `fragment` is one word contains textual symbols, numbers and underscore. White spaces are not allowed.
  - Enter a note. The `note` is a short description of the purposes of this public key.
  - Save entered data. For ORG.JSON hosting can be chosen Arbor option or your own host.
  - Update your ORG.ID by sending a transaction. After transaction will be mined your organization representation on the Arbor will be refreshed.

