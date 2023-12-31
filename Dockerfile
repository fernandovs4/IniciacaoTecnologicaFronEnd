FROM node:current-alpine as build
WORKDIR /projeto-iniciacao/
COPY public/ /projeto-iniciacao/public
COPY src/ /projeto-iniciacao/src
COPY package.json /projeto-iniciacao/
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /projeto-iniciacao/build /usr/share/nginx/html
EXPOSE 80