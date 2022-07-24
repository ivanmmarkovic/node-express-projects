
### { timestamps: true }
- { timestamps: true } in mongoose.Schema
- creates created_at and updated_at fields


### cryptojs
- npm install crypto-js

```

const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    // password: req.body.password
    password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
        ).toString(),
});

// toString method - to save encrypted password in database

```