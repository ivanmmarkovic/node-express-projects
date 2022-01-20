
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
POST       |/login                           | login
POST       |/logout                          | logout
POST       |/users                           | create user                    
GET        |/users                           | get all users                     
GET        |/users/:id                       | get user by id                   
PATCH      |/users/:id                       | update user                    
DELETE     |/users/:id                       | delete user  


Request body when creating user
```
{
  "username": "john",
  "email": "john@example.com",
  "password": "john"
}
```

Request body when updating user can contain all fields or some fileds. 
If user submit new password, password will be updated.
```
{
  "username": "johnupdated",
  "email": "johnupdated@example.com"
}
```
