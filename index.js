const express = require('express');
const fs = require('fs');

const server = express();
server.use(express.json());

server.post('/',
  (
    req,
    res,
  ) => {
    const body = req.body;
    console.log('body: ', body);
    fs.readFile(
      './todos.json',
      (err, data) => {
        const db = JSON.parse(data);
        const id = Date.now();
        db.todos[id] = { ...req.body };
        
        fs.writeFile(
          './todos.json',
          JSON.stringify(db),
          (err) => {
            if (err) {
              console.log('error', err)
            } else {
              res.send(db)
            }
          }
        );
        
      });
  },
);

server.get(
  '/',
  (
    req,
    res,
  ) => {
    fs.readFile(
      './todos.json',
      // 'utf-8',
      (err, data) => {
        res.send(JSON.parse(data));
      },
    );
  });

server.listen(3000, () => {
  console.log('server server');
});
