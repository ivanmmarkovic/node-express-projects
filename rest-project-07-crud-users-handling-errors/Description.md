
#### [Express error handling](https://expressjs.com/en/guide/error-handling.html)

Open terminal in project directory and run:

```
- docker-compose up --build

```

In another terminal window open project and run:

```
npm install
npm run start-dev

```

Method | Path | Description
-------|------|------------ 
POST       |/users                           | create user                    
GET        |/users                           | get all users                     
GET        |/users/:id                       | get user by id                   
PATCH      |/users/:id                       | update user                    
DELETE     |/users/:id                       | delete user  


Request body when creating user
```
{
  "username": "john",
  "email": "john@example.com"
}
```

Request body when updating user can contain both fields or only one filed
```
{
  "username": "johnupdated",
  "email": "johnupdated@example.com"
}
```

# Error handling

### Create user - missing field
- next(error)

### Get user by id - wrong id
- next(error) - return null, should return 404
- app.use((err, req, res, next) ...) - return null, should return 404

### Update user by id - wrong id
- next(error) - return null, should return 404
- app.use((err, req, res, next) ...) - return null, should return 404

### Delete user by id - wrong id
- next(error) - return null
- app.use((err, req, res, next) ...) - return null


### Get and update user by id
```

if(user == null){
  res.status(404).json({message: "Not found"});
}

```

