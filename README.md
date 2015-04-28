Blog
====

a blog project build with koa.js

this blog use MongoDB.

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
