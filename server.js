const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

const app = express();

const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');

const port = process.env.PORT || 8080;

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vue');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express validator
app.use(
  expressValidator({
    errorFormatter: (parm, msg, value) => {
      const namespace = param.split('.');
      const root = namespace.shift();
      const formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

app.listen(port, err => {
  if (err) {
    throw new Error(err);
  }
  console.log(`App listening on port: ${port}`);
});
