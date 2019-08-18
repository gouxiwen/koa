FROM node:10.16.0
ADD ./ /app/
WORKDIR /app
RUN npm install
EXPOSE 4123
CMD ["npm", "run", "build"]