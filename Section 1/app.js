const express = require('express'),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const choosePollOption = (req, res, topic) => {
  fs.readFile(__dirname + '/poll.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    }
    let poll = JSON.parse(data);
    poll[topic] += 1;
    fs.writeFile(
      __dirname + '/poll.json',
      JSON.stringify(poll),
      (error, data) => {
        res.status(200).send('want to <a href="/">vote</a> again');
      }
    );
  });
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/vote/new', (req, res) => {
  // this route will be used to submit a new vote
  console.log('req.body', req.body);
  if (req.body.linux) {
    choosePollOption(req, res, 'linux');
  } else if (req.body.macos) {
    choosePollOption(req, res, 'macos');
  } else if (req.body.windows) {
    choosePollOption(req, res, 'windows');
  } else {
    res.redirect('/?incorrect+input');
  }
});

app.get('/poll', (req, res) => {
  // this route will be used to retrieve the current votes
  fs.readFile(__dirname + '/poll.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

app.listen('3000', error => {
  if (error) {
    console.log('error');
  } else {
    console.log('listening on port 3000');
  }
});
