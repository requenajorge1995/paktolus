## Description
This project is the result of the second assignment of the **Paktolus** application process.

**Requirements**

> 1.  Obtain JWT using the URL https://developers.google.com/oauthplayground/
> 2.  Write simple server using https://nestjs.com/ and http://www.passportjs.org/ 
> 3.  Implement custom strategy which uses JWT from first step to authorize user
> 4.  User data (email, name) is inside JWT, display this data in response to request

**Necessary Scopes** - Google OAuth2 API v2  
- https://www.googleapis.com/auth/userinfo.email
- https://www.googleapis.com/auth/userinfo.profile

**API Endpoints**
- http://localhost:3000/auth/google (custom passport strategy)
- http://localhost:3000/auth/stockstrategy (passport-jwt)

## Installation
```bash
$ npm install
```
## Running the app
```bash
# development
$ npm run start
```
## Test
```bash
# e2e tests
$ npm run test:e2e
```

 Author - **Jorge Requena** - requenajorge1995@gmail.com