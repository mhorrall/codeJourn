---
contentType: blog
path: /pgp
title: You down with PGP?
date: '2019-01-15T14:41:53-06:00'
---
I recently was given a task at work to encrypt / decrpyt files using PGP.  I had never even heard of PGP so I thought it would make a good blog post.

1. What is PGP?

PGP literally stands for Pretty Good Privacy.  The name is not exactly inspiring but it is widely used to encrypt sensitive files and messages. <https://en.wikipedia.org/wiki/Pretty_Good_Privacy>

2. How do I use it?

The TL/DR version is that you generate a set of private and public keys.  The public key you give to anyone that wants to send you an encrypted file.  You then use your private key (and a passphrase) to decrypt the file.  It is a one way communication if you wish to send a file back you will need the recipient's public key.

On to the code:

I found a Nuget package that accomplishes much of my objective.  <https://github.com/mattosaurus/PgpCore>

I used this package to create a demo application in DDD style.  You can clone or download the working example here: <https://github.com/mhorrall/PGPDemo>

Here is the code in the PgpService inside the infrastructure project:

```
 public class PgpService : IPgpService
```

```
    {
```

```
        public PgpDto GenerateKeys(string userName, string password, int length = 2048)
```

```
        {
```

```
            var pgpDto = new PgpDto();
```

```
            using (var pgp = new PGP())
```

```
            {
```

```
                var publicKeyStream = new MemoryStream();
```

```
                var privateKeyStream = new MemoryStream();
```

```

```

```
                pgp.GenerateKey(publicKeyStream, privateKeyStream, userName, password, length);
```

```

```

```
                pgpDto.PrivateKey = GetStringFromStream(privateKeyStream);
```

```
                pgpDto.PublicKey = GetStringFromStream(publicKeyStream);
```

```
            }
```

```

```

```
            return pgpDto;
```

```
        }
```

```

```

```
        private string GetStringFromStream(MemoryStream ms)
```

```
        {
```

```
            ms.Position = 0;
```

```
            var sr = new StreamReader(ms);
```

```
            return sr.ReadToEnd();
```

```
        }
```

```

```

```
        private static Stream GenerateStreamFromString(string s)
```

```
        {
```

```
            var stream = new MemoryStream();
```

```
            var writer = new StreamWriter(stream);
```

```
            writer.Write(s);
```

```
            writer.Flush();
```

```
            stream.Position = 0;
```

```
            return stream;
```

```
        }
```

```

```

```
        public void EncryptFile(string inputFilePath, string outputFilePath, string publicKey)
```

```
        {
```

```
            using (var pgp = new PGP())
```

```
            {
```

```
                using (FileStream inputFileStream = new FileStream(inputFilePath, FileMode.Open))
```

```
                using (Stream outputFileStream = File.Create(outputFilePath))
```

```
                using (Stream publicKeyStream = GenerateStreamFromString(publicKey))
```

```
                    pgp.EncryptStream(inputFileStream, outputFileStream, publicKeyStream, true, true);
```

```
            }
```

```
        }
```

```

```

```
        public void DecryptFile(string inputFilePath, string outputFilePath, string privateKey, string password)
```

```
        {
```

```
            using (var pgp = new PGP())
```

```
            {
```

```
                using (FileStream inputFileStream =
```

```
                    new FileStream(inputFilePath, FileMode.Open))
```

```
                using (Stream outputFileStream = File.Create(outputFilePath))
```

```
                using (Stream privateKeyStream = GenerateStreamFromString(privateKey))
```

```
                    pgp.DecryptStream(inputFileStream, outputFileStream, privateKeyStream, password);
```

```
            }
```

```
        }
```

```
    }
```

I used steams because in production I am storing and retrieving the keys in a Vault and I wanted to be able to pass in those keys as strings when working with the encryption service.  I used <https://www.vaultproject.io/> in to persist the keys in production but standing up a vault server is outside the scope of this post.

To generate keys:

```
        private static void GenerateKeys()
```

```
        {
```

```
            // Input username, password, strength if desired default is 2048
```

```
            _pgpDto = PgpService.GenerateKeys(_username, _password);
```

```

```

```
            Console.WriteLine($"Public Key: \r\n {_pgpDto.PublicKey}");
```

```
            Console.WriteLine($"Private Key: \r\n {_pgpDto.PrivateKey}");
```

```
            Console.ReadLine();
```

```
        }
```

Here I am passing in a username and password.  The method returns a Data Transfer Object (DTO) that is defined in the PgpDemo.Core project.
