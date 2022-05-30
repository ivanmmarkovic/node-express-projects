

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
PUT        |/users/:id                       | update user                    
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


