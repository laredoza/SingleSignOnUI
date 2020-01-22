# Single Sign-on Server

An Angular front end for IdentityServer4. [IdentityServer4](http://docs.identityserver.io/en/latest/) is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. 

## Features and Requirements

### Features

- Manage Clients;
- Manage Api Resources;
- Manage Identity Resources;
- Manage Users;
- Manage Roles;

![Preview](https://dev.azure.com/laredoza/c08230d9-840c-4294-bf9c-a1e47c6cdac0/_apis/git/repositories/6cf9f8bc-d979-4904-bb68-c439b304a06e/items?path=%2FSingleSignOn.gif&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0)

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
