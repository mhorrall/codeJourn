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
