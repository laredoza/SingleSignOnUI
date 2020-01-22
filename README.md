# Single Sign-on Server

An Angular front end for IdentityServer4. [IdentityServer4](http://docs.identityserver.io/en/latest/) is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. 

## Features and Requirements

### Features

- Manage Clients;
- Manage Api Resources;
- Manage Identity Resources;
- Manage Users;
- Manage Roles;

![Preview](https://raw.githubusercontent.com/laredoza/SingleSignOnUI/master/SingleSignOn.gif)

### There are two Api projects.
- IdentityServerAspNetIdentity ( This offers the main IdentityServer4 functionality )
- AdminApi ( Dotnet core api used to manage the Identity4 server ) 

## Installation

### Install yarn

Run `sudo npm install yarn -g` 

### Install modules
Run `yarn install` 

## Run UI 

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
