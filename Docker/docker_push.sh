docker tag single-sign-on-admin stage9registry.azurecr.io/single-sign-on-admin:latest
docker push stage9registry.azurecr.io/single-sign-on-admin:latest

sudo docker tag single-sign-on-admin localhost:5010/single-sign-on-admin:latest
sudo docker push localhost:5010/single-sign-on-admin:latest
