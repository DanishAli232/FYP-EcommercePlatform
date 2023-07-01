FROM node:14
WORKDIR /app
COPY . /app
COPY package.json bin constants Controllers Middleware Models public Routes Utils Validators app.js chatUsers.js .
RUN npm install --production
EXPOSE 5000
CMD [ "node", "app.js" ]
