Blog
====

a blog project build with koa.js.

you need 3 Step to run this koa blog app.

* Install MongoDB and Start
* Install Nodejs>=0.12 & npm install
* Start app with `node --harmony`


### Guides of MongoDB

Step 1 - Installation ( Don't follow this step if you have already installed MongoDB ):
```
brew update
brew install mongodb
```

Step 2 - Run Mongo Daemon:
```
mkdir -p /data/db
sudo mongod
```

Step 3 - Run Mongo Shell Interface:
```
mongo
```
In this sequence, I was able to run the mongo command without any error.

### Start MongoDB as Daemon

you need to use param `--fork` of `mongod` . And `--logpath` , `--dbpath` is also needed!
for example

```
[root@localhost mongodb]# ./bin/mongod --dbpath=data/db --fork --logpath=log/mongodb.log   
all output going to: /opt/mongodb/log/mongodb.log  
forked process: 3300  
```

you can also use `mongodb.conf` to setup daemon

> mongodb.conf

```
port=27017  
dbpath=data/db  
logpath=log/mongodb.log  
logappend=true  
fork=true  
```
then
```
[root@localhost mongodb]# ./bin/mongod -f mongodb.conf   
all output going to: /opt/mongodb/log/mongodb.log  
forked process: 3377  
```

### Node & npm

you need `Nodejs` version `>=0.12`
you can use [nvm](https://www.npmjs.com/package/nvm) or [n](https://www.npmjs.com/package/n) to install Nodejs and manage multi version of Nodejs

After Node & npm installed

```
npm install
```

### Start App

```
node --harmony app.js
```
