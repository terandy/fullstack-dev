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

//private key:`993c948a-1f31-48ba-913c-ceb5f4359be3`

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
app.post('/user', upload.none(), (req, res) => {
  console.log('request to /user');
  res.send(JSON.stringify({ user: sessions[req.cookies.sid] }));
});
app.post('/logout', upload.none(), (req, res) => {
  if (req.cookies.sid) {
    delete sessions[req.cookies.sid];
    res.send(JSON.stringify({ success: true }));
  } else {
    res.send(JSON.stringify({ success: false }));
  }
});
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
  let cart = req.body.cart;
  console.log('cart:', cart);
  if (!cart) {
    cart = [];
  }
  console.log('dbo response register');
  dbo.collection('users').findOne({ username: name }, (err, user) => {
    if (user === null) {
      dbo.collection('users').insertOne({
        username: name,
        password: sha1(pwd),
        cart: cart.map(item => {
          return { item: item, quantity: 1 };
        })
      });
      res.send(JSON.stringify({ success: true }));
    } else {
      res.send(JSON.stringify({ success: false }));
    }
  });
});
app.post('/update-tag-item', upload.none(), (req, res) => {
  let sid = req.cookies.sid;
  let seller = req.body.seller;
  console.log('session', sessions[sid]);
  console.log('seller', seller);
  console.log('update-tag-item endpoint');
  if (sessions[sid] && sessions[sid] === seller) {
    let tag = req.body.tag;
    dbo.collection('items').updateOne(
      { _id: ObjectID(req.body.itemId) },
      {
        $set: {
          tag: tag
        }
      }
    );
    console.log('item updated');

    res.send(JSON.stringify({ success: true }));
    return;
  } else {
    console.log('Item not added');
    res.send(JSON.stringify({ success: false }));
  }
});
app.post('/update-image-item', upload.array('images'), (req, res) => {
  let sid = req.cookies.sid;
  let seller = req.body.seller;
  console.log('session', sessions[sid]);
  console.log('seller', seller);
  if (sessions[sid] && sessions[sid] === seller) {
    let files = req.files;
    let imgPaths = files.map(file => {
      return '/uploads/' + file.filename;
    });
    console.log('images', imgPaths);
    dbo.collection('items').updateOne(
      { _id: ObjectID(req.body.itemId) },
      {
        $set: {
          imgPaths: imgPaths
        }
      }
    );
    console.log('item updated');

    res.send(JSON.stringify({ success: true, imgPaths: imgPaths }));
    return;
  } else {
    console.log('Item not added');
    res.send(JSON.stringify({ success: false }));
  }
});
app.post('/add-item', upload.array('images'), (req, res) => {
  let sid = req.cookies.sid;
  let seller = req.body.seller;
  console.log('session', sessions[sid]);
  console.log('seller', seller);
  if (sessions[sid] && sessions[sid] === seller) {
    let description = req.body.description;
    let price = req.body.price;
    let tag = req.body.tag.split(',');
    let item = req.body.item;
    let files = req.files;
    let imgPaths = files.map(file => '/uploads/' + file.filename);

    dbo.collection('items').insertOne({
      description: description,
      item: item,
      seller: seller,
      imgPaths: imgPaths,
      price: price,
      tag: tag
    });

    res.send(JSON.stringify({ success: true }));
  } else {
    res.send(JSON.stringify({ success: false }));
  }
});
////////
app.post('/update-image-order-item', upload.none(), (req, res) => {
  let sid = req.cookies.sid;
  let seller = req.body.seller;
  console.log('session', sessions[sid]);
  console.log('seller', seller);
  if (sessions[sid] && sessions[sid] === seller) {
    let images = req.body.images;
    console.log('images order', images);
    dbo.collection('items').updateOne(
      { _id: ObjectID(req.body.itemId) },
      {
        $set: {
          imgPaths: images
        }
      }
    );
    console.log('item updated');

    res.send(JSON.stringify({ success: true }));
    return;
  } else {
    console.log('Item not added');
    res.send(JSON.stringify({ success: false }));
  }
});
app.post('/update-detail-item', upload.none(), (req, res) => {
  let sid = req.cookies.sid;
  let seller = req.body.seller;
  console.log('session', sessions[sid]);
  console.log('seller', seller);
  if (sessions[sid] && sessions[sid] === seller) {
    let description = req.body.description;
    let price = req.body.price;
    let item = req.body.item;
    dbo.collection('items').updateOne(
      { _id: ObjectID(req.body.itemId) },
      {
        $set: {
          description: description,
          item: item,
          price: price
        }
      }
    );
    console.log('item updated');

    res.send(JSON.stringify({ success: true }));
    return;
  } else {
    console.log('Item not added');
    res.send(JSON.stringify({ success: false }));
  }
});
app.post('/delete-item', upload.none(), (req, res) => {
  let sid = req.cookies.sid;
  let seller = req.body.seller;
  console.log('/delete-item endpoint');
  console.log(req.body.itemId);
  console.log('session', sessions[sid]);
  console.log('seller', seller);
  if (sessions[sid] && sessions[sid] === seller) {
    dbo.collection('items').deleteOne({ _id: ObjectID(req.body.itemId) });
    console.log('item deleted');

    res.send(JSON.stringify({ success: true }));
    return;
  } else {
    console.log('Item not deleted');
    res.send(JSON.stringify({ success: false }));
  }
});

app.post('/add-to-cart', upload.none(), async (req, res) => {
  let itemId = req.body.itemId;
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];

  try {
    let updated = false;
    let user = await dbo.collection('users').findOne({ username });
    user.cart.forEach(element => {
      if (element.item === itemId) {
        updated = true;
        dbo
          .collection('users')
          .updateOne(
            { username, 'cart.item': itemId },
            { $inc: { 'cart.$.quantity': 1 } }
          );
      }
    });
    if (updated === false)
      dbo
        .collection('users')
        .updateOne(
          { username },
          { $push: { cart: { item: itemId, quantity: 1 } } }
        );
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log('error', err);
    res.send(JSON.stringify({ success: false }));
  }
});

app.post('/cart', upload.none(), async (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];

  try {
    let user = await dbo.collection('users').findOne({ username });
    let cart = await dbo
      .collection('items')
      .find({
        _id: { $in: user.cart.map(item => ObjectID(item.item)) }
      })
      .toArray();

    cart.forEach(item => {
      user.cart.forEach(i => {
        if (item._id.toString() === i.item) {
          item.quantity = i.quantity;
        }
      });
    });

    res.send(JSON.stringify({ success: true, cart }));
  } catch (err) {
    console.log('error', err);
    res.send(JSON.stringify({ success: false }));
  }
});

app.post('/remove-cart-item', upload.none(), async (req, res) => {
  let itemId = req.body.itemId;
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];

  try {
    if (itemId === 'all') {
      console.log('emptying cart');
      dbo.collection('users').updateOne({ username }, { $pull: { cart: {} } });
    }
    dbo
      .collection('users')
      .updateOne({ username }, { $pull: { cart: { item: itemId } } });

    let user = await dbo.collection('users').findOne({ username });
    let cart = await dbo
      .collection('items')
      .find({
        _id: { $in: user.cart.map(item => ObjectID(item.item)) }
      })
      .toArray();

    cart.forEach(item => {
      user.cart.forEach(i => {
        if (item._id.toString() === i.item) {
          item.quantity = i.quantity;
        }
      });
    });

    console.log(cart);
    res.send(JSON.stringify({ success: true, cart }));
  } catch (err) {
    console.log('error', err);
    res.send(JSON.stringify({ success: false }));
  }
});

app.post('/update-cart-quantity', upload.none(), async (req, res) => {
  let value = req.body.value;
  let itemId = req.body.itemId;
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];

  try {
    let user = await dbo.collection('users').findOne({ username });
    user.cart.forEach(element => {
      if (element.item === itemId) {
        dbo
          .collection('users')
          .updateOne(
            { username, 'cart.item': itemId },
            { $inc: { 'cart.$.quantity': parseInt(value) } }
          );
      }
    });
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log('error', err);
    res.send(JSON.stringify({ success: false }));
  }
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
    .findOne({ _id: ObjectID(req.body.itemId) }, (err, item) => {
      if (err) {
        console.log('error', err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      // console.log('item', item);
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
