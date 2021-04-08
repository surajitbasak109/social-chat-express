## Depencies
```json
{
  "bcrypt": "^5.0.1",
  "body-parser": "^1.19.0",
  "dotenv": "^8.2.0",
  "express": "^4.17.1",
  "joi": "^17.4.0",
  "jsonwebtoken": "^8.5.1",
  "mongoose": "^5.12.3",
  "mongoose-paginate": "^5.0.3",
  "morgan": "^1.10.0",
  "passport": "^0.4.1",
  "passport-jwt": "^4.0.0",
  "swagger-ui-express": "^4.1.6"
}
```
### DevDependies
```json
{
  "babel-cli": "^6.26.0",
  "babel-plugin-transform-runtime": "^6.23.0",
  "babel-preset-env": "^1.7.0",
  "eslint-config-airbnb-base": "^14.2.1",
  "eslint-plugin-import": "^2.22.1",
  "nodemon": "^2.0.7"
}
```

## Install Dependencies

```shell
npm install
```

## Start MongoDB

```shell
mongod
```

## Run Application

```shell
npm start
```

## API Documentation

### Authentication

#### **POST** User Registration

```
{{ _.URI }}/api/users/signup
```

| Headers      | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

Body json

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@gmail.com",
  "password": "secret@key",
  "role": 2
}
```

#### User Login

```
{{ _.URI }}/api/users/login
```

| Headers      | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

Body (json)

```
{
  "email": "surajitbasak109@gmail.com",
  "password": "p@$$w0rd"
}
```

#### **GET** Me

```
{{ _.URI }}/api/users/me
```

| Headers       | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| Content-Type  | application/json                                             |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmVhMTU2NjJjMjQwODA3YzBmODM3ZiIsImlhdCI6MTYxNzg2NTY2MywiZXhwIjoxNjE3OTUyMDYzfQ.FOr5yY5XPjdnT5eEY4mk-OSuxnReVdDcQVRPS2BXikc |



### Tweet

------

#### **POST** Post tweet

```
{{ _.URI }}/api/tweets
```

This route can be used to create new tweet.

Headers

Accept

application/json

Content-Type

application/json

Authorization

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ
```

Body json

```
{
  "body": "Creating relationship by using this example."
}
```

------

Example request:

```
curl "{{ _.URI }}/api/tweets" \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ' \
  -X POST \
  -d '{
  "body": "Creating relationship by using this example."
}' 
```

#### **DELETE** Delete tweet

```
{{ _.URI }}/api/tweets/606ccdc94bc4d1a52f965896
```

------

Example request:

```
curl "{{ _.URI }}/api/tweets/606ccdc94bc4d1a52f965896" \
  -X DELETE 
```

#### **GET** Find single tweet

```
{{ _.URI }}/api/tweets/606ed5618d111c4d3fb8ab90
```

Headers

Authorization

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ
```

------

Example request:

```
curl "{{ _.URI }}/api/tweets/606ed5618d111c4d3fb8ab90" \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ' \
  -X GET 
```

#### **GET** All Tweets

```
{{ _.URI }}/api/tweets
```

Parameters

perPage

30

page

1

Headers

Authorization

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmVhMTU2NjJjMjQwODA3YzBmODM3ZiIsImlhdCI6MTYxNzg2NTY2MywiZXhwIjoxNjE3OTUyMDYzfQ.FOr5yY5XPjdnT5eEY4mk-OSuxnReVdDcQVRPS2BXikc
```

------

Example request:

```
curl "{{ _.URI }}/api/tweets?perPage=30&page=1" \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmVhMTU2NjJjMjQwODA3YzBmODM3ZiIsImlhdCI6MTYxNzg2NTY2MywiZXhwIjoxNjE3OTUyMDYzfQ.FOr5yY5XPjdnT5eEY4mk-OSuxnReVdDcQVRPS2BXikc' \
  -X GET 
```

#### **PUT** Update tweet

```
{{ _.URI }}/api/tweets/606eb7ea4181f6d640e9eb57
```

Headers

Content-Type

application/json

Authorization

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmVhMTU2NjJjMjQwODA3YzBmODM3ZiIsImlhdCI6MTYxNzg2NTY2MywiZXhwIjoxNjE3OTUyMDYzfQ.FOr5yY5XPjdnT5eEY4mk-OSuxnReVdDcQVRPS2BXikc
```

Body json

```
{
  "body": "Trying to post a new tweet with bearer token"
}
```

### Category

------

#### **POST** Create category

```
{{ _.URI }}/api/categories
```

Headers

Content-Type

application/json

Authorization

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ
```

Body json

```
{
  "tweets": [
    "606ed5618d111c4d3fb8ab90",
    "606eb7ea4181f6d640e9eb57",
    "606d44a7bef97bc04239a033"
  ],
  "name": "Imotional Tweets"
}
```

------

Example request:

```
curl "{{ _.URI }}/api/categories" \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ' \
  -X POST \
  -d '{
   "tweets": ["606ed5618d111c4d3fb8ab90", "606eb7ea4181f6d640e9eb57", "606d44a7bef97bc04239a033"],
  "name": "Imotional Tweets"
}' 
```

#### **GET** All categories

```
{{ _.URI }}/api/categories
```

Headers

Content-Type

application/json

Authorization

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ
```

Body json

```
{
  "tweets": [
    "606ed5618d111c4d3fb8ab90",
    "606eb7ea4181f6d640e9eb57",
    "606d44a7bef97bc04239a033"
  ],
  "name": "Imotional Tweets"
}
```

------

Example request:

```
curl "{{ _.URI }}/api/categories" \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5ZThhOWEyOTJlNThjM2JjOWI5NSIsImlhdCI6MTYxNzg3NjMwMCwiZXhwIjoxNjE3OTYyNzAwfQ.9_Hu5IJ3U601YcacAqjYfWd6sb7yR3zTI-Ac3UO6vQQ' \
  -X GET \
  -d '{
   "tweets": ["606ed5618d111c4d3fb8ab90", "606eb7ea4181f6d640e9eb57", "606d44a7bef97bc04239a033"],
  "name": "Imotional Tweets"
}' 
```