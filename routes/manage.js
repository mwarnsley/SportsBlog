const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('MANAGE');
});

router.get('/articles/add', (req, res, next) => {
  res.render('add_article', {title: 'Created Articles'});
});

module.exports = router;
