
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
POST   |/articles                   | create article                    
GET    |/articles                   | get all articles                     
GET    |/articles/:id               | get article by id                   
PATCH  |/articles/:id               | update article                    
DELETE |/articles/:id               | delete article  
POST   |/articles/:id/comments      | create comment


Request body when creating article
```
{
  "title": "First article",
  "body": "Body of the first article"
}
```

Request body when updating article can contain both fields or only one filed
```
{
  "title": "First article",
  "body": "Updated body of the first article"
}
```

Request body when creating comment
```
{
  "body": "Body of the first comment"
}
```


# TODO
- handle other CRUD methods for comment
- provide populate on comment side
- handle errors for comments crud