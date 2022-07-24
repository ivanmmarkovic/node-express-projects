
### { timestamps: true }
- { timestamps: true } in mongoose.Schema
- creates createdAt and updatedAt fields


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

### Avoid returning password

```
const { password, ...others } = user._doc;  
return res.status(200).json({...others});

```


### next() means any function

```

/*
const verifyToken = (req, res, next)
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, 
        () => {} // ANY FUNCTION HERE
    )
};
*/

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};
```

### query
- categories field in ProductModel
- qCategory is in categories field in ProductModel
```

const qCategory = req.query.category;

products = await ProductModel.find({
    categories: {
        $in: [qCategory],
    },
});

```

### query

```

// amount is field on OrderModel
// total: { $sum: "$sales" } - sum amounts as sales

const date = new Date();
const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

try {
const income = await OrderModel.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
    $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
    },
    },
    {
    $group: {
        _id: "$month",
        total: { $sum: "$sales" },
    },
    },
]);
return res.status(200).json(income);
} catch (err) {
return res.status(500).json(err);
}
```