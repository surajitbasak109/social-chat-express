# Questions for making RESTful API using Express and MongoDB

## Express

### How can I create web server using Express?

- Install express and import
- declare app variable and set the value by calling express function
- Create route for your application
- call the listen method of the app and use port as a first parameter and for second parameter use callback function. Then inside the callback function show an output to the command that the server is listening to port e.g. 3000.

```js
import express from 'express'
const app = express()
app.get('/', (req, res) => {
    return res.json({
        "message": "Welcome to Express application"
    });
});
app.listen(3000, () => {
   console.log("Server is listening to http://localhost:3000"); 
});
```



### How can I make dotenv work?

- Install dotenv package
- import dotenv and call the config function

```js
require('dotenv').config()
```



### How can I create middleware in Express?

- Create any function and use three parameters in that function for request, response and next
- execute your code and call the next function
- Now to use your function as a middleware in express you can call the use method from the app object

```js
function myLogger(req, res, next) {
    console.log("LOGGING for incoming request");
    next();
}

app.use(myLogger);
```

### How to use Express Router?

- create a route file
- import express
- declare a variable and set the value by calling `Router` method from express
- call the route method from the declared variable and pass the path as a parameter then chain another method by http verb e.g. get, post, put, delete etc. This methods accepts two mandatory parameters like request and response.
- Then call the `use` method from app object with two parameters: path and the module you just have created

``` js
/*
|--------------------------------
| post.js
|--------------------------------
*/
import express from 'express'
const postRouter = express.Router();
postRouter.route('/').get((req, res) => {
    res.json('display all posts');
}).post((req, res) => {
    // validate request body
    
    res.json('create new post');
});

postRouter.route('/:id').get((req, res) => {
    res.json('displaying individual post');
}).put((req, res) => {
    res.json('update the post');
}).delete((req, res) => {
    res.json('delete the post');
});

export default postRouter;

/*
|--------------------------------
| index.js
|--------------------------------
*/
import express from 'express'
import postRouter from './post'
const restRouter = express.Router();
restRouter.use('/post', postRouter);
export default restRouter;

/*
|--------------------------------
| app.js/server.js
|--------------------------------
*/
import express from 'express'
import restRouter from './routes' // import index.js from routes directory

const app = express();
app.use('/api', restRouter);
```

### How can I log every request happening in Express server?

- Install morgan
- import logger from morgan
- use logger in app

```js
import logger from 'morgan'
app.use(logger('dev'))
```



### How can I display invalid route status for wrong endpoint?

```js
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});
```



### How can I architect my express web application? Should I use DDD (Domain Driven Design)?

## MongoDB

### How do I connect to MongoDB?

```js
/*
|------------------------------
| db.js
|------------------------------
*/
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongourl = `mongodb://localhost:27017/database`;
export const connect = () => mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

/*
|------------------------------
| app.js/server.js
|------------------------------
*/
import { connect } from './config/db';
connect()
```

### Should I use promise globally in mongodb? And what is the advantage of using it?

If you wan to use asynchronous request you should use promise globally for Mongoose  4.x but Mongoose 5 uses native promise.  

### What is `useNewUrlParser`, `useCreateIndex`, `useUnifiedTopology` and why should I use it when connecting to mongoDB?

**`useNewUrlParser`:** The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the **useNewUrlParser** flag to allow users to fall back to the old parser if they find a bug in the new parser. You should set **useNewUrlParser**: true unless that prevents you from connecting.

**`useCreateIndex`:** False by default. Set to true to make Mongoose's default index build **use createIndex**() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.

**`useUnifiedTopology`:** Refer to https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/ for more details

### How can I create mongo schema? How can I use database model?

### How can I secure my deployed mongodb community server?

#### Connect to your MongoDB instance

```bash
mongo --host <HOSTNAME> --port <PORT>
```

**Output:**

```bash
MongoDB shell version v4.4.4
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("d4298c36-cdcd-4d9a-a280-a7b9571cfc55") }
MongoDB server version: 4.4.4
---
The server generated these startup warnings when booting: 
        2021-04-06T21:59:24.128+05:30: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
        2021-04-06T21:59:25.676+05:30: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
```



#### Switch to the `admin` database.

```bash
use admin
switched to db admin
```

#### Create a [`root`](https://docs.mongodb.com/manual/reference/built-in-roles/#root) user with the `db.createUser()` method.

```bash
db.createUser(
  {
    user: "superuser",
    pwd: "changeMeToAStrongPassword",
    roles: [ "root" ]
  }
)

Successfully added user: { "user" : "superuser", "roles" : [ "root" ] }
```

Users with the [`root`](https://docs.mongodb.com/manual/reference/built-in-roles/#root) role have full privileges on all resources. You can therefore use your new `superuser` user to query your database, add indexes, create additional users, administer your deployment, etc.

#### Verify that you have successfully added your user

Run `show users` to see if your user was created:

```bash
show users
```

**Output: **

```bash
{
    "_id" : "admin.superuser",
    "userId" : UUID("afd33348-aad5-46e5-9c25-2c4512cab631"),
    "user" : "superuser",
    "db" : "admin",
    "roles" : [
        {
        "role" : "root",
        "db" : "admin"
        }
    ],
    "mechanisms" : [
        "SCRAM-SHA-1",
        "SCRAM-SHA-256"
    ]
}

```

#### Shut down your MongoDB instance.

From the `mongo` shell, shut down your [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance.

```bash
db.shutdownServer()
server should be down...
```

Type `exit` to exit the `mongo` shell.

```bash
exit
```

#### Restart your MongoDB instance with access control.

To restart MongoDB with access control, run the [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process from your terminal with the [`--auth`](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-mongod-auth) option. The [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process is located in a `bin` folder in the MongoDB installation directory.

```bash
mongod --dbpath <path to data directory> --auth
```

####  Restart your MongoDB instance with access control.

- Windows
- macOS
- Linux

NOTE

The following instructions assume that you installed MongoDB from a `tar.gz` archive rather than using a package manager. If you used the package manager for your Linux distribution to install MongoDB, edit your [configuration file](https://docs.mongodb.com/manual/reference/configuration-options/#configuration-options) to include the [`security.authorization`](https://docs.mongodb.com/manual/reference/configuration-options/#security.authorization) setting before starting your [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) service as usual. Refer to the [configuration file](https://docs.mongodb.com/manual/reference/configuration-options/#configuration-options) documentation for more information.

To restart MongoDB with access control, run the [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process from your terminal with the [`--auth`](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-mongod-auth) option. The [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process is located in a `bin` folder in the MongoDB installation directory.

copycopied

```
mongod --dbpath <path to data directory> --auth
```

If you used the default data directory for your MongoDB deployment, (i.e., `/data/db`), you can leave off the [`--dbpath`](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-mongod-dbpath) option.

If your [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance has successfully started, you will see logging output in your terminal that includes `[initandlisten] waiting for connections`.



### How can I Install compass?

Refer this [link](https://docs.mongodb.com/compass/current/install/)

### Where is mongodb configuration file?

| Platform | Method                                    | Configuration File                                           |
| :------- | :---------------------------------------- | :----------------------------------------------------------- |
| Linux    | `apt`, `yum`, or `zypper` Package Manager | `/etc/mongod.conf`                                           |
| macOS    | `brew` Package Manager                    | `/usr/local/etc/mongod.conf` (on Intel processors), or`/opt/homebrew/etc/mongod.conf` (on [Apple M1 processors](https://support.apple.com/en-us/HT211814)) |
| Windows  | MSI Installer                             | `<install directory>\bin\mongod.cfg`                         |

### How do I enable authentication?

Refer [this link](https://docs.mongodb.com/manual/tutorial/enable-authentication/) for more details

### How do I connect after enabling authentication using url string?

```
MONGO_DB=mongodb://<username>:<password>@localhost:27017/databasename?authSource=admin&w=majority
```

