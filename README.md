# Single Sign-on UI 

Angular Admin UI for IdentityServer4. It uses [SingleSignOnApi](https://github.com/laredoza/SingleSignOnApi) to manage [SingleSignOnIdentityServer(IdentityServer4)](https://github.com/laredoza/SingleSignOnIdentityServer)

[IdentityServer4](http://docs.identityserver.io/en/latest/) is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. 

## Features and Requirements

### Features

- Manage Clients;
- Manage Api Resources;
- Manage Identity Resources;
- Manage Users;
- Manage Roles;


![Preview](https://raw.githubusercontent.com/laredoza/SingleSignOnUI/master/SingleSignOn.gif)

### Requirements
- [SingleSignOnApi ( Api used to manage the Identity4 server )](https://github.com/laredoza/SingleSignOnApi) 
- [SingleSignOnIdentityServer ( IdentityServer4 functionality )](https://github.com/laredoza/SingleSignOnIdentityServer)
- [SingleSignOnExamples ( Example applications used to connect to Identity4 server) ](https://github.com/laredoza/SingleSignOnExamples)

## Installation

### Install Yarn

Run `sudo npm install yarn -g` 

### Install Modules
Run `yarn install` 

## Run Admin UI 

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Default Users

User: Admin

Password: Pass123$ 

User: bob 

Password: Pass123$ 

The bob user will not have enough permissions to do anything. Errors will need to be handled better.

## Links
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
