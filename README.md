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
- [Single Sign-on Api ( Api used to manage the Identity4 server )](https://github.com/laredoza/SingleSignOnApi) 
- [Single Sign-on IdentityServer ( IdentityServer4 functionality )](https://github.com/laredoza/SingleSignOnIdentityServer)
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

# Deploying to Production Via Docker ( Postgres )
In the following example the database, Single Sign-on Api and Single Sign-on IdentityServer are on the same server with an ip of 10.133.7.99.

## Migration
Update the appsettings in the Postgres migration and run it. It is found in [Single Sign-on Api ( Api used to manage the Identity4 server )](https://github.com/laredoza/SingleSignOnApi). Another alternative is to use the sql files.
```
{
  "serverUrl": "http://10.133.7.99",
  "ConnectionStrings": {
    "defaultConnection": "Host=10.133.7.99;Database=SingleSignOn;Username=postgres;Password=password1;"
  }
}
```

## [Single Sign-on Api ( Api used to manage the Identity4 server )](https://github.com/laredoza/SingleSignOnApi)

```
docker stop single-sign-on-admin-api 
docker rm single-sign-on-admin-api  
docker run \
	--name=single-sign-on-admin-api \
	-d --restart unless-stopped \
	-p 5001:80 \
	-e "ConnectionStrings__DefaultConnection"="Host=10.133.7.99;Database=SingleSignOn;Username=postgres;Password=password1;" \
	-e "Url__Authority"="http://10.133.7.99:5000" \
	-e "Url__CorsUrl"="http://10.133.7.99:4200" \
	-e "DatabaseType"="Postgres" \
	laredoza/single-sign-on-admin-api:latest
```
## [Single Sign-on IdentityServer ( IdentityServer4 functionality )](https://github.com/laredoza/SingleSignOnIdentityServer)

```
docker stop single-sign-on 
docker rm single-sign-on  
docker run \
	--name=single-sign-on \
	-d --restart unless-stopped \
	-p 5000:80 \
	-e "ConnectionStrings__DefaultConnection"="Host=10.133.7.99;Database=SingleSignOn;Username=postgres;Password=password1;" \
	-e "DatabaseType"="Postgres" \
	laredoza/single-sign-on:latest
```
## Single Sign-on UI
I haven't found a decent way to apply enviroment values so there isn't a pre-built docker. You will have to create your own. 

### Update enviroment.prod.ts to use your own ip / domain.
```
export const environment = {
  production: true,
  adminApi: 'http://10.133.7.99:5001',
  OidcClient: {
    authority: 'http://10.133.7.99:5000/',
    client_id: 'single_sign_on_server',
    redirect_uri: 'http://10.133.7.99:4200/auth-callback',
    post_logout_redirect_uri: 'http://10.133.7.99:4200/',
    response_type: 'id_token token',
    scope: 'openid profile identity_admin admin-api',
    filterProtocolClaims: true,
    loadUserInfo: true
  },
  urlRegEx: "^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$"
};
```
### Create Docker Image
```
docker build --rm -t single-sign-on-admin .. -f ../Dockerfile
```
### Push Docker Image to Own Repositiory
Replace localhost:5010 with own repository details.

```
sudo docker tag single-sign-on-admin localhost:5010/single-sign-on-admin:latest
sudo docker push localhost:5010/single-sign-on-admin:latest
```
### Run Docker on Server
Replace localhost:5010 with own repository details.

```
docker stop single-sign-on-admin 
docker rm -f single-sign-on-admin 
docker run \
	--name=single-sign-on-admin \
	-d --restart unless-stopped \
	-it -p 4200:80 \
	localhost:5010/single-sign-on-admin:latest
```
## Links
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
