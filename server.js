// Librairies
let express = require('express');
let app = express();
let reloadMagic = require('./reload-magic.js');
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let multer = require('multer');
let sha1 = require('sha1');
let upload = multer({ dest: __dirname + '/uploads/' });
let cookieParser = require('cookie-parser');
app.use(cookieParser());
reloadMagic(app);
app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets
app.use('/uploads', express.static('uploads'));

//Database
let dbo = undefined;
let url =
  'mongodb+srv://bob:bobsue@cluster0-2cadr.mongodb.net/test?retryWrites=true&w=majority';
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db('media-board');
  }
);

//Storage
let sessions = {};

// Your endpoints go after this line
app.post('/login', upload.none(), (req, res) => {
  console.log('login', req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection('users').findOne({ username: name }, (err, user) => {
    if (err) {
      console.log('/login error', err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === sha1(pwd)) {
      let sessionId = '' + Math.floor(Math.random() * 100000000);
      sessions[sessionId] = name;
      res.cookie('sid', sessionId);
      res.send(JSON.stringify({ success: true }));
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

app.post('/register', upload.none(), (req, res) => {
  console.log('register', req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection('users').insertOne({ username: name, password: sha1(pwd) });
  res.send(JSON.stringify({ success: true }));
});

app.post('/add-item', upload.array('images'), (req, res) => {
  let description = req.body.description;
  let seller = req.body.seller;
  let price = req.body.price;
  let item = req.body.item;
  let files = req.files;
  let imgPaths = files.map(file => '/uploads/' + file.filename);

  dbo.collection('items').insertOne({
    description: description,
    item: item,
    seller: seller,
    imgPaths: imgPaths,
    price: price
  });
  res.send(JSON.stringify({ success: true }));
});

app.post('/all-items', upload.none(), (req, res) => {
  console.log('request to /all-items');
  dbo
    .collection('items')
    .find({})
    .toArray((err, items) => {
      if (err) {
        console.log('error', err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log('posts', items);
      res.send(JSON.stringify(items));
    });
});
app.post('/one-item', upload.none(), (req, res) => {
  console.log('request to /one-items');
  dbo
    .collection('items')
    .find({ _id: ObjectID(req.body.itemId) })
    .toArray((err, item) => {
      if (err) {
        console.log('error', err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log('item', item);
      res.send(JSON.stringify(item));
    });
});

// Your endpoints go before this line

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
