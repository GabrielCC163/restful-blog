# RESTFUL BLOG

### Requirements:
* Docker
* Docker Compose
* Node (v16.14.0)
* NPM (v8.3.1)

<hr>

### Start the API
The command below will start all services and run the migrations and seeds:
```
cd restful-blog

docker-compose up -d

npm i

npm start
```

<b>Tip: when running `npm start`, the project will also insert two default users in the database:</b>
- email: reeves@gmail.com / password: 123123
- email: jackman@gmail.com / password: 123123



<hr>


### API Documentation
* Access: http://localhost:3000/docs


<hr>

### Run requests in Insomnia


<hr>

### Tests
```
cd restful-blog

npm run test
```

<hr>

### Technologies
* NestJS
    * Framework for building efficient, scalable Node.js server-side applications.
    * Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.
    * Along with NestJS, this project used the **TypeScript** programming language.

* PostgreSQL
    * One of the most used and highly stable relational databases nowadays.

* TypeORM
    * One of the best ORMs for NestJS that makes easy to link TypeScript application up to a relational database. 
    * TypeORM uses TypeScript decorators extremely effectively, resulting in entity classes that are expressive and very easy to read.
