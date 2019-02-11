# A Simple Login Application via (Angular6 + Route Guard + Http Interceptor + JWT) + (Node + Express)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Clone this repository locally
`git clone https://github.com/jsmuster/ang6-jwt-login ng-login`

`cd ng-login`

`npm install`

## Development server

Run 

`ng serve --proxy-config proxy.conf.json` 

for a dev server & a proxy. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## API server

The API for this project, which needs to be running for this project to function properly:
https://github.com/jsmuster/ang6-jwt-login-node-api

## Screenshots

User logs into the site

![Login Page][login]

User lands on a user home page

![User Home Page][user]

User clicks Increment button to increment a counter

![Increment Action][increment-action]

User clicks Confirm button. The counter is incremented

![Action Result][incremented-result]

[login]: https://raw.githubusercontent.com/jsmuster/ang6-jwt-login/master/src/imgs/login-page.png "Login Page"
[user]: https://raw.githubusercontent.com/jsmuster/ang6-jwt-login/master/src/imgs/user-page.png "User Page"
[increment-action]: https://raw.githubusercontent.com/jsmuster/ang6-jwt-login/master/src/imgs/increment-action.png "Increment Action"
[incremented-result]: https://raw.githubusercontent.com/jsmuster/ang6-jwt-login/master/src/imgs/incremented-result.png "Increment Result"