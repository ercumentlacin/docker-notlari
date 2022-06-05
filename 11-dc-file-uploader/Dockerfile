FROM node:14-slim
WORKDIR /uploader-app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]