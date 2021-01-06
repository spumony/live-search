const express = require('express');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');
const cors = require('cors');
const DB = require('./db/dataset');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.get('/search', (request, response) => {
  response.send(DB);
});

const server = spdy.createServer(
  {
    key: fs.readFileSync(
      path.resolve(__dirname + '/certificate/localhost.key')
    ),
    cert: fs.readFileSync(
      path.resolve(__dirname + '/certificate/localhost.crt')
    ),
  },
  app
);

server.listen(port, () => {
  console.log(
    `Server started on port ${port}. Visit https://localhost:${port}/`
  );
  console.log('Press CTRL + C to stop the server');
});
