FROM node:18-alpine

WORKDIR /mentor-matching/client 

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY package.json package-lock.json ./
RUN npm i

COPY . .

# EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]
