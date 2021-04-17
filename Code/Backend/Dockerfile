FROM node:alpine

WORKDIR /app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

EXPOSE 3001

#Expose port and start application
CMD [ "npm", "start" ]
