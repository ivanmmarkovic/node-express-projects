
# [Node.js E-Commerce App REST API with MongoDB | Shopping API with Stripe & JWT](https://www.youtube.com/watch?v=rMiRZ1iRC0A)

- [Source Code](https://github.com/safak/youtube/tree/node-shop-api)

- [0:00 Introduction](https://www.youtube.com/watch?v=rMiRZ1iRC0A)
- [01:08 Creating an Express App](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=68s)
- [06:11 Node.js MongoDB Connection](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=371s)
- [12:20 Understanding Node.js Router](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=740s)
- [21:15 Node.js MongoDB Models](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=1275s)
- [31:45 Node.js MongoDB Authentication](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=1905s)
- [50:28 Node.js JWT Implementation](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=3028s)
- [54:00 Node.js CRUD Operations with JWT](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=3240s)
- [01:37:50 Advanced MongoDB Functions](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=5870s)
- [01:46:23 Node.js Stripe Implementation](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=6383s)
- [01:51:04 Stripe React.js Implementation](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=6664s)
- [01:57:04 React, Node.js, Stripe Payment Implementation](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=7024s)
- [02:06:21 Outro](https://www.youtube.com/watch?v=rMiRZ1iRC0A&t=7581s)




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