---
contentType: blog
path: /pgp
title: You down with PGP?
date: '2019-01-15T14:41:53-06:00'
---
I recently was given a task at work to encrypt / decrypt files using PGP. I had never even heard of PGP so I thought it would make a good blog post.

## What is PGP?

PGP literally stands for Pretty Good Privacy. The name is not exactly inspiring but it is widely used to encrypt sensitive files and messages. <https://en.wikipedia.org/wiki/Pretty_Good_Privacy>

## How do I use it?

The TL/DR version is that you generate a set of private and public keys. The public key you give to anyone that wants to send you an encrypted file. You then use your private key (and a passphrase) to decrypt the file. It is a one-way communication if you wish to send a file back you will need the recipient's public key.

## **On to the code..**

I found a Nuget package that accomplishes much of my objective. <https://github.com/mattosaurus/PgpCore>

I used this package to create a demo application in Domain Driven Design (DDD) style architecture. You can clone or download the working example here: <https://github.com/mhorrall/PGPDemo>

Here is the code in the PgpService inside the infrastructure project:

```csharp
 public class PgpService : IPgpService
 {
    public PgpDto GenerateKeys(string userName, string password, int length = 2048)
    {
        var pgpDto = new PgpDto();

        using (var pgp = new PGP())
        {
            var publicKeyStream = new MemoryStream();
            var privateKeyStream = new MemoryStream();
            pgp.GenerateKey(publicKeyStream, privateKeyStream, userName, password, length);
            pgpDto.PrivateKey = GetStringFromStream(privateKeyStream);
            pgpDto.PublicKey = GetStringFromStream(publicKeyStream);
        }

        return pgpDto;
    }

    private string GetStringFromStream(MemoryStream ms)
    {
        ms.Position = 0;
        var sr = new StreamReader(ms);
        return sr.ReadToEnd();
    }

    private static Stream GenerateStreamFromString(string s)
    {
        var stream = new MemoryStream();
        var writer = new StreamWriter(stream);
        writer.Write(s);
        writer.Flush();
        stream.Position = 0;
        return stream;
    }

    public void EncryptFile(string inputFilePath, string outputFilePath, string publicKey)
    {
        using (var pgp = new PGP())
        {
            using (FileStream inputFileStream = new FileStream(inputFilePath, FileMode.Open))
            using (Stream outputFileStream = File.Create(outputFilePath))
            using (Stream publicKeyStream = GenerateStreamFromString(publicKey))
                pgp.EncryptStream(inputFileStream, outputFileStream, publicKeyStream, true, true);
        }
    }

    public void DecryptFile(string inputFilePath, string outputFilePath, string privateKey, string password)
    {
        using (var pgp = new PGP())
        {
            using (FileStream inputFileStream =
                new FileStream(inputFilePath, FileMode.Open))
            using (Stream outputFileStream = File.Create(outputFilePath))
            using (Stream privateKeyStream = GenerateStreamFromString(privateKey))
                pgp.DecryptStream(inputFileStream, outputFileStream, privateKeyStream, password);
        }
    }
  }
```

I used steams because in production I am persisting the keys in a vault and I wanted to be able to pass in those keys as strings when working with the encryption service. I used <https://www.vaultproject.io/> to store the keys in production but standing up a vault server is outside the scope of this post.

To generate keys:

```csharp
    private static void GenerateKeys()
    {
        // Input username, password, strength if desired default is 2048
        _pgpDto = PgpService.GenerateKeys(_username, _password);
        Console.WriteLine($"Public Key: \r\n {_pgpDto.PublicKey}");
        Console.WriteLine($"Private Key: \r\n {_pgpDto.PrivateKey}");
        Console.ReadLine();
    }
```

Here I am passing in a username and password. The method returns a Data Transfer Object (DTO) that is defined in the PgpDemo.Core project. It's a class that has two string properties one for the public key and another for the private key. Normally you would store these values for future use but for this example they are just class variables so you will need to re-generate them each time the application is run.

To encrypt a file:

```csharp
    private static void EncryptFile(string filePath)
    {
        PgpService.EncryptFile(filePath, "EncryptedFile.pgp", _pgpDto.PublicKey);
        Console.WriteLine("File has been encrypted");
        Console.ReadLine();
    }
```

The first parameter is the file to be encrypted the second parameter is the newly created encrypted file path, and the third is the public key. (If you were encrypting this file for another party you would need their public key here.) The encrypted file is usually named with a ".pgp" extension.

To decrypt a file:

```csharp
    private static void DecryptFile(string filePath)
    {
      PgpService.DecryptFile(filePath, "DecryptedFile.txt", _pgpDto.PrivateKey, _password);
      Console.WriteLine("File has been decrypted");
      Console.ReadLine();
    }
```

The first parameter is the file to be decrypted the second is the file path of the new decrypted file, the third parameter is your private key. This only works if the sender used your public key to encrypt the file.

And there you have a working PGP example...

You down with PGP?
